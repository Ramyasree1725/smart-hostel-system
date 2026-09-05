const express = require('express');
const router = express.Router();
const {
  dispatchDoctor,
  dispatchReinforcements,
  dispatchSupplyDrop,
  getActiveDispatches,
} = require('../controllers/logisticsController');

router.get('/active', getActiveDispatches);
router.post('/dispatch-doctor', dispatchDoctor);
router.post('/dispatch-reinforcements', dispatchReinforcements);
router.post('/dispatch-supply', dispatchSupplyDrop);

module.exports = router;
