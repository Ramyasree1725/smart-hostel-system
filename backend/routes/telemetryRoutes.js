const express = require('express');
const router = express.Router();
const { postTelemetry, getTelemetryBySoldier, getDashboardStats } = require('../controllers/telemetryController');

router.post('/', postTelemetry); // Ingest from ESP32 / Simulator
router.get('/dashboard-stats', getDashboardStats);
router.get('/:soldierId', getTelemetryBySoldier);

module.exports = router;
