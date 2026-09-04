const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/rooms', require('./routes/roomRoutes'));
app.use('/api/fees', require('./routes/feeRoutes'));
app.use('/api/complaints', require('./routes/complaintRoutes'));
app.use('/api/leaves', require('./routes/leaveRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/notices', require('./routes/noticeRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/gate', require('./routes/gateLogRoutes'));
app.use('/api/mess', require('./routes/messRoutes'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'Smart Hostel Management System API',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    roles: ['student', 'warden', 'security', 'admin'],
  });
});

// Root route
app.get('/', (req, res) => {
  res.send('Smart Hostel Management API v2.0 is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Smart Hostel Server running on port ${PORT}`);
});
