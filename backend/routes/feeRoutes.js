const express = require('express');
const router = express.Router();
const { getMyFee, payFee, getAllFees, sendFeeReminder } = require('../controllers/feeController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/my', protect, getMyFee);
router.post('/pay', protect, payFee);
router.get('/', protect, authorize('admin', 'warden'), getAllFees);
router.post('/remind/:id', protect, authorize('admin', 'warden'), sendFeeReminder);

module.exports = router;
