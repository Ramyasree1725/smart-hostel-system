const express = require('express');
const router = express.Router();
const {
  verifyGatePass,
  recordCheckOut,
  recordCheckIn,
  getGateLogs,
} = require('../controllers/gateLogController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/verify-pass', protect, verifyGatePass);
router.post('/check-out', protect, authorize('security', 'admin', 'warden'), recordCheckOut);
router.post('/check-in', protect, authorize('security', 'admin', 'warden'), recordCheckIn);
router.get('/logs', protect, getGateLogs);

module.exports = router;
