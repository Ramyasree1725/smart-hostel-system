const store = require('../services/inMemoryStore');

// GET all soldiers with optional search and unit filters
const getSoldiers = async (req, res) => {
  try {
    const { search, unit, status } = req.query;
    let list = [...store.soldiers];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.displayName.toLowerCase().includes(q) ||
          s.soldierId.toLowerCase().includes(q) ||
          (s.deviceId && s.deviceId.toLowerCase().includes(q))
      );
    }

    if (unit && unit !== 'ALL') {
      list = list.filter((s) => s.unit.toLowerCase().includes(unit.toLowerCase()));
    }

    if (status && status !== 'ALL') {
      list = list.filter((s) => s.monitoringStatus === status);
    }

    res.json({ success: true, count: list.length, soldiers: list });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET single soldier by ID
const getSoldierById = async (req, res) => {
  try {
    const { id } = req.params;
    const soldier = store.soldiers.find((s) => s.soldierId === id || s._id === id);

    if (!soldier) {
      return res.status(404).json({ success: false, message: 'Soldier record not found' });
    }

    // Get telemetry history for this soldier
    const history = store.telemetryLogs
      .filter((t) => t.soldierId === soldier.soldierId)
      .slice(-30);

    // Get active alerts for this soldier
    const alerts = store.alerts.filter((a) => a.soldierId === soldier.soldierId);

    res.json({
      success: true,
      soldier,
      telemetryHistory: history,
      alerts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST add new soldier
const addSoldier = async (req, res) => {
  try {
    const { displayName, rank, unit, bloodGroup, emergencyContact, deviceId } = req.body;

    if (!displayName || !unit) {
      return res.status(400).json({ success: false, message: 'Display Name and Unit are required' });
    }

    const nextNumber = store.soldiers.length + 1;
    const soldierId = `SOL-${String(nextNumber).padStart(3, '0')}`;

    const newSoldier = {
      soldierId,
      displayName,
      rank: rank || 'Soldier',
      unit,
      bloodGroup: bloodGroup || 'O+Pos',
      emergencyContact: emergencyContact || '+91-0000000000',
      deviceId: deviceId || null,
      monitoringStatus: 'ACTIVE',
      healthStatus: 'NORMAL',
      lastHeartRate: 72,
      lastTemperature: 36.6,
      lastSpO2: 98,
      lastBattery: 100,
      motionActivity: 'STATIONARY',
      lastLocation: {
        lat: 17.440081 + (Math.random() - 0.5) * 0.01,
        lng: 78.348915 + (Math.random() - 0.5) * 0.01,
        address: 'Sector Alpha Perimeter',
      },
      lastSeen: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    store.soldiers.push(newSoldier);

    // If device was assigned, update device
    if (deviceId) {
      const dev = store.devices.find((d) => d.deviceId === deviceId);
      if (dev) {
        dev.assignedSoldierId = soldierId;
      }
    }

    store.logAudit('SOLDIER_ADDED', `New soldier registered: ${displayName} (${soldierId}) assigned unit ${unit}`);

    if (store.io) {
      store.io.emit('soldier_added', newSoldier);
    }

    res.status(201).json({ success: true, message: 'Soldier registered successfully', soldier: newSoldier });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT update soldier
const updateSoldier = async (req, res) => {
  try {
    const { id } = req.params;
    const index = store.soldiers.findIndex((s) => s.soldierId === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Soldier not found' });
    }

    const current = store.soldiers[index];
    const updated = { ...current, ...req.body, soldierId: current.soldierId };
    store.soldiers[index] = updated;

    // Update device assignment if changed
    if (req.body.deviceId !== undefined && req.body.deviceId !== current.deviceId) {
      if (current.deviceId) {
        const oldDev = store.devices.find((d) => d.deviceId === current.deviceId);
        if (oldDev) oldDev.assignedSoldierId = null;
      }
      if (req.body.deviceId) {
        const newDev = store.devices.find((d) => d.deviceId === req.body.deviceId);
        if (newDev) newDev.assignedSoldierId = current.soldierId;
      }
    }

    store.logAudit('SOLDIER_UPDATED', `Soldier profile updated: ${updated.displayName} (${updated.soldierId})`);

    if (store.io) {
      store.io.emit('soldier_update', updated);
    }

    res.json({ success: true, message: 'Soldier profile updated', soldier: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE soldier
const deleteSoldier = async (req, res) => {
  try {
    const { id } = req.params;
    const index = store.soldiers.findIndex((s) => s.soldierId === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Soldier not found' });
    }

    const removed = store.soldiers.splice(index, 1)[0];

    // Unassign device
    if (removed.deviceId) {
      const dev = store.devices.find((d) => d.deviceId === removed.deviceId);
      if (dev) dev.assignedSoldierId = null;
    }

    store.logAudit('SOLDIER_DELETED', `Soldier record removed: ${removed.displayName} (${removed.soldierId})`);

    if (store.io) {
      store.io.emit('soldier_deleted', { soldierId: id });
    }

    res.json({ success: true, message: 'Soldier record deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getSoldiers, getSoldierById, addSoldier, updateSoldier, deleteSoldier };
