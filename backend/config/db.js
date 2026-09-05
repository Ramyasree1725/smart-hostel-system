const mongoose = require('mongoose');

let isMongoConnected = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/smart_soldier_monitoring', {
      serverSelectionTimeoutMS: 3000,
    });
    isMongoConnected = true;
    console.log(`[DB] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[DB] MongoDB not detected locally (${error.message}).`);
    console.log(`[DB] Running with High-Performance In-Memory Data Store & Realtime Simulation fallback.`);
    isMongoConnected = false;
  }
};

const getDBStatus = () => isMongoConnected;

module.exports = { connectDB, getDBStatus };
