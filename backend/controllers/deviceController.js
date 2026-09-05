const store = require('../services/inMemoryStore');

// GET all devices
const getDevices = async (req, res) => {
  try {
    res.json({ success: true, count: store.devices.length, devices: store.devices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST add new device
const addDevice = async (req, res) => {
  try {
    const { deviceId, deviceName, firmwareVersion, loraFrequency } = req.body;

    if (!deviceId) {
      return res.status(400).json({ success: false, message: 'Device ID is required (e.g. DEV-006)' });
    }

    const exists = store.devices.find((d) => d.deviceId.toUpperCase() === deviceId.toUpperCase());
    if (exists) {
      return res.status(400).json({ success: false, message: 'Device ID already exists' });
    }

    const newDevice = {
      deviceId: deviceId.toUpperCase(),
      deviceName: deviceName || `Bio-Tactical Band ${deviceId}`,
      assignedSoldierId: null,
      status: 'ONLINE',
      battery: 100,
      signalStrength: 95,
      firmwareVersion: firmwareVersion || 'v2.4.1-esp32',
      loraFrequency: loraFrequency || '868.1 MHz',
      ipAddress: `192.168.1.${100 + store.devices.length + 1}`,
      lastSeen: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    store.devices.push(newDevice);
    store.logAudit('DEVICE_REGISTERED', `New IoT Device registered: ${newDevice.deviceId}`);

    if (store.io) {
      store.io.emit('device_added', newDevice);
    }

    res.status(201).json({ success: true, message: 'Device registered successfully', device: newDevice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT update device
const updateDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const index = store.devices.findIndex((d) => d.deviceId === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Device not found' });
    }

    store.devices[index] = { ...store.devices[index], ...req.body };
    res.json({ success: true, message: 'Device updated', device: store.devices[index] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getDevices, addDevice, updateDevice };
