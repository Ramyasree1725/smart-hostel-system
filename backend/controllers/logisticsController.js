const store = require('../services/inMemoryStore');

// POST dispatch doctor to soldier
const dispatchDoctor = async (req, res) => {
  try {
    const { soldierId, doctorName, reason } = req.body;
    if (!soldierId) {
      return res.status(400).json({ success: false, message: 'soldierId is required' });
    }

    const dispatch = store.dispatchDoctor(soldierId, doctorName, reason);
    if (!dispatch) {
      return res.status(404).json({ success: false, message: 'Soldier record not found' });
    }

    res.status(200).json({
      success: true,
      message: `Medical Doctor (${dispatch.assignedPersonnel}) dispatched successfully!`,
      dispatch,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST dispatch reinforcements to soldier
const dispatchReinforcements = async (req, res) => {
  try {
    const { soldierId, backupTeamName, reason } = req.body;
    if (!soldierId) {
      return res.status(400).json({ success: false, message: 'soldierId is required' });
    }

    const dispatch = store.dispatchReinforcements(soldierId, backupTeamName, reason);
    if (!dispatch) {
      return res.status(404).json({ success: false, message: 'Soldier record not found' });
    }

    res.status(200).json({
      success: true,
      message: `Reinforcements (${dispatch.assignedPersonnel}) dispatched successfully!`,
      dispatch,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST dispatch supply drop (Food, Water, Weapons/Ammo)
const dispatchSupplyDrop = async (req, res) => {
  try {
    const { soldierId, items, method } = req.body;
    if (!soldierId) {
      return res.status(400).json({ success: false, message: 'soldierId is required' });
    }

    const supply = store.dispatchSupplyDrop(soldierId, items, method);
    if (!supply) {
      return res.status(404).json({ success: false, message: 'Soldier record not found' });
    }

    res.status(200).json({
      success: true,
      message: `Tactical supply drop (${supply.method}) initiated!`,
      supply,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET all active dispatches & supplies
const getActiveDispatches = async (req, res) => {
  try {
    res.json({
      success: true,
      dispatches: store.dispatches,
      supplies: store.supplies,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  dispatchDoctor,
  dispatchReinforcements,
  dispatchSupplyDrop,
  getActiveDispatches,
};
