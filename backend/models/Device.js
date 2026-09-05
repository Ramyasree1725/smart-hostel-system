const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema(
  {
    deviceId: {
      type: String,
      required: true,
      unique: true,
    },
    deviceName: {
      type: String,
      default: 'IoT Bio-Tactical Band',
    },
    assignedSoldierId: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ['ONLINE', 'OFFLINE', 'MAINTENANCE', 'LOW_BATTERY'],
      default: 'ONLINE',
    },
    battery: {
      type: Number,
      default: 100,
    },
    signalStrength: {
      type: Number, // dBm or percentage (0-100)
      default: 90,
    },
    firmwareVersion: {
      type: String,
      default: 'v2.4.1-esp32',
    },
    loraFrequency: {
      type: String,
      default: '868 MHz',
    },
    ipAddress: {
      type: String,
      default: '192.168.1.105',
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Device', deviceSchema);
