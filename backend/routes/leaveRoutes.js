const express = require('express');
const router = express.Router();
const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus,
  getMyNotifications,
} = require('../controllers/leaveController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/').post(protect, applyLeave).get(protect, authorize('admin', 'warden'), getAllLeaves);
router.get('/my', protect, getMyLeaves);
router.get('/notifications', protect, getMyNotifications);
router.put('/:id', protect, authorize('admin', 'warden'), updateLeaveStatus);

module.exports = router;
