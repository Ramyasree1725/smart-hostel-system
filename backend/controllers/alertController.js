const store = require('../services/inMemoryStore');

// GET all alerts with filter by status or severity
const getAlerts = async (req, res) => {
  try {
    const { status, severity, soldierId } = req.query;
    let list = [...store.alerts];

    if (status && status !== 'ALL') {
      list = list.filter((a) => a.status === status);
    }

    if (severity && severity !== 'ALL') {
      list = list.filter((a) => a.severity === severity);
    }

    if (soldierId) {
      list = list.filter((a) => a.soldierId === soldierId);
    }

    res.json({ success: true, count: list.length, alerts: list });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT acknowledge alert
const acknowledgeAlert = async (req, res) => {
  try {
    const { id } = req.params;
    const officerName = req.user ? req.user.name : (req.body.officerName || 'Commanding Officer');

    const updatedAlert = store.acknowledgeAlert(id, officerName);

    if (!updatedAlert) {
      return res.status(404).json({ success: false, message: 'Alert not found' });
    }

    res.json({
      success: true,
      message: `Alert ${updatedAlert.alertId} acknowledged by ${officerName}`,
      alert: updatedAlert,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST manual emergency SOS / tactical broadcast alert
const triggerManualAlert = async (req, res) => {
  try {
    const { soldierId, type, message, severity } = req.body;

    const soldier = store.soldiers.find((s) => s.soldierId === soldierId);

    const alert = store.createAlert({
      soldierId: soldierId || 'FLEET-BROADCAST',
      soldierName: soldier ? soldier.displayName : 'Tactical Unit',
      deviceId: soldier ? soldier.deviceId : 'MANUAL-CMD',
      type: type || 'SOS_MANUAL_TRIGGER',
      severity: severity || 'CRITICAL',
      message: message || 'Manual emergency alert broadcasted by officer.',
      value: 'MANUAL',
      location: soldier ? soldier.lastLocation : undefined,
    });

    res.status(201).json({ success: true, message: 'Emergency alert dispatched', alert });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAlerts, acknowledgeAlert, triggerManualAlert };
