const express = require('express');
const router = express.Router();
const { getAlerts, acknowledgeAlert, triggerManualAlert } = require('../controllers/alertController');
const auth = require('../middleware/auth');

router.get('/', getAlerts);
router.put('/:id/acknowledge', acknowledgeAlert);
router.post('/trigger', auth, triggerManualAlert);

module.exports = router;
