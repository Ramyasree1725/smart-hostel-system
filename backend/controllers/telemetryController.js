const store = require('../services/inMemoryStore');

// POST telemetry from ESP32 / Gateway / Simulator
const postTelemetry = async (req, res) => {
  try {
    const { soldierId, deviceId, heartRate, temperature, spO2, battery, latitude, longitude, motionActivity, sosTriggered } = req.body;

    if (!deviceId && !soldierId) {
      return res.status(400).json({ success: false, message: 'deviceId or soldierId is required' });
    }

    const result = store.ingestTelemetry({
      soldierId,
      deviceId,
      heartRate: heartRate !== undefined ? Number(heartRate) : 75,
      temperature: temperature !== undefined ? Number(temperature) : 36.6,
      spO2: spO2 !== undefined ? Number(spO2) : 98,
      battery: battery !== undefined ? Number(battery) : 80,
      latitude,
      longitude,
      motionActivity,
      sosTriggered: !!sosTriggered,
    });

    res.status(200).json({
      success: true,
      message: 'Telemetry ingested successfully',
      data: result.telemetry,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET recent telemetry logs for a soldier
const getTelemetryBySoldier = async (req, res) => {
  try {
    const { soldierId } = req.params;
    const limit = parseInt(req.query.limit) || 50;

    const logs = store.telemetryLogs
      .filter((t) => t.soldierId === soldierId)
      .slice(-limit);

    res.json({ success: true, count: logs.length, telemetry: logs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET overall fleet dashboard metrics & stats
const getDashboardStats = async (req, res) => {
  try {
    const totalSoldiers = store.soldiers.length;
    const activeSoldiers = store.soldiers.filter((s) => s.monitoringStatus === 'ACTIVE').length;
    const activeDevices = store.devices.filter((d) => d.status === 'ONLINE').length;
    const offlineDevices = store.devices.filter((d) => d.status === 'OFFLINE').length;
    const activeAlerts = store.alerts.filter((a) => a.status === 'ACTIVE').length;
    const criticalAlerts = store.alerts.filter((a) => a.status === 'ACTIVE' && a.severity === 'CRITICAL').length;

    // Average biometrics of active soldiers
    const activeWithVitals = store.soldiers.filter((s) => s.monitoringStatus === 'ACTIVE' && s.lastHeartRate > 0);
    const avgHeartRate = activeWithVitals.length
      ? Math.round(activeWithVitals.reduce((acc, s) => acc + s.lastHeartRate, 0) / activeWithVitals.length)
      : 0;
    const avgTemperature = activeWithVitals.length
      ? Number((activeWithVitals.reduce((acc, s) => acc + s.lastTemperature, 0) / activeWithVitals.length).toFixed(1))
      : 0;
    const avgBattery = activeWithVitals.length
      ? Math.round(activeWithVitals.reduce((acc, s) => acc + s.lastBattery, 0) / activeWithVitals.length)
      : 0;

    res.json({
      success: true,
      stats: {
        totalSoldiers,
        activeSoldiers,
        activeDevices,
        offlineDevices,
        activeAlerts,
        criticalAlerts,
        avgHeartRate,
        avgTemperature,
        avgBattery,
      },
      recentAlerts: store.alerts.slice(0, 5),
      liveSoldiers: store.soldiers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { postTelemetry, getTelemetryBySoldier, getDashboardStats };
