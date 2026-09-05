const express = require('express');
const router = express.Router();
const { getReportSummary, getAuditLogs } = require('../controllers/reportController');
const auth = require('../middleware/auth');

router.get('/summary', getReportSummary);
router.get('/audit-logs', auth, getAuditLogs);

module.exports = router;
