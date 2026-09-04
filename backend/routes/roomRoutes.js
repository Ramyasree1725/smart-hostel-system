const express = require('express');
const router = express.Router();
const {
  getRooms,
  getRoomById,
  createRoom,
  smartAllocateRoom,
  deallocateRoom,
  deleteRoom,
} = require('../controllers/roomController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/').get(getRooms).post(protect, authorize('admin', 'warden'), createRoom);
router.post('/smart-allocate', protect, smartAllocateRoom);
router.post('/deallocate', protect, authorize('admin', 'warden'), deallocateRoom);
router.route('/:id').get(getRoomById).delete(protect, authorize('admin', 'warden'), deleteRoom);

module.exports = router;
