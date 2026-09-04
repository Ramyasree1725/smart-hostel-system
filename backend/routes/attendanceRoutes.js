const express = require('express');
const router = express.Router();
const { getAttendanceByDate, saveAttendance } = require('../controllers/attendanceController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getAttendanceByDate)
  .post(protect, authorize('admin', 'warden'), saveAttendance);

module.exports = router;
