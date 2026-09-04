const express = require('express');
const router = express.Router();
const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus,
  deleteComplaint,
} = require('../controllers/complaintController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/').post(protect, createComplaint).get(protect, authorize('admin', 'warden'), getAllComplaints);
router.get('/my', protect, getMyComplaints);
router.route('/:id').put(protect, updateComplaintStatus).delete(protect, deleteComplaint);

module.exports = router;
