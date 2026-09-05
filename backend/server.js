require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { connectDB } = require('./config/db');
const store = require('./services/inMemoryStore');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const soldierRoutes = require('./routes/soldierRoutes');
const deviceRoutes = require('./routes/deviceRoutes');
const telemetryRoutes = require('./routes/telemetryRoutes');
const alertRoutes = require('./routes/alertRoutes');
const reportRoutes = require('./routes/reportRoutes');
const settingRoutes = require('./routes/settingRoutes');
const logisticsRoutes = require('./routes/logisticsRoutes');

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

// Socket.IO Setup with CORS
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

// Pass Socket.IO instance to in-memory store for automatic broadcasting
store.setSocketIO(io);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoints
app.get('/', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'Smart Soldier Monitoring System - Mission Control Backend',
    version: '1.2.0',
    timestamp: new Date().toISOString(),
    totalSoldiers: store.soldiers.length,
    activeDevices: store.devices.filter((d) => d.status === 'ONLINE').length,
    activeAlerts: store.alerts.filter((a) => a.status === 'ACTIVE').length,
    activeDispatches: store.dispatches.length,
    activeSupplies: store.supplies.length,
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', uptime: process.uptime() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/soldiers', soldierRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/telemetry', telemetryRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/logistics', logisticsRoutes);

// Socket.IO Event Handlers
io.on('connection', (socket) => {
  console.log(`[WebSocket] Client connected: ${socket.id}`);

  socket.emit('initial_state', {
    soldiers: store.soldiers,
    devices: store.devices,
    alerts: store.alerts,
    settings: store.settings,
    dispatches: store.dispatches,
    supplies: store.supplies,
  });

  socket.on('simulate_telemetry', (data) => {
    store.ingestTelemetry(data);
  });

  socket.on('acknowledge_alert', ({ alertId, officerName }) => {
    store.acknowledgeAlert(alertId, officerName);
  });

  socket.on('disconnect', () => {
    console.log(`[WebSocket] Client disconnected: ${socket.id}`);
  });
});

// Start Server
const startServer = async () => {
  await connectDB();

  server.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🛡  SMART SOLDIER MONITORING SYSTEM - BACKEND READY`);
    console.log(`🛰  REST API:      http://localhost:${PORT}/api`);
    console.log(`⚡  Socket.IO:     ws://localhost:${PORT}`);
    console.log(`======================================================\n`);
  });
};

startServer();
