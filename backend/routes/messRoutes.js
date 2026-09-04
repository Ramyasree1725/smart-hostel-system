const express = require('express');
const router = express.Router();
const { getMessRecords, saveMessInspection } = require('../controllers/messController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getMessRecords);
router.post('/inspect', protect, authorize('admin', 'warden'), saveMessInspection);

module.exports = router;
