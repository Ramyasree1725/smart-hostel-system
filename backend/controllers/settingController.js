const store = require('../services/inMemoryStore');

// GET current system settings
const getSettings = async (req, res) => {
  try {
    res.json({ success: true, settings: store.settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT update system settings
const updateSettings = async (req, res) => {
  try {
    store.settings = { ...store.settings, ...req.body };
    store.logAudit('SETTINGS_UPDATED', 'Threshold configuration parameters modified by officer.');

    if (store.io) {
      store.io.emit('settings_updated', store.settings);
    }

    res.json({ success: true, message: 'Settings updated successfully', settings: store.settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getSettings, updateSettings };
