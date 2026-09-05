const mongoose = require('mongoose');

const telemetrySchema = new mongoose.Schema(
  {
    soldierId: {
      type: String,
      required: true,
      index: true,
    },
    deviceId: {
      type: String,
      required: true,
      index: true,
    },
    heartRate: {
      type: Number,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    spO2: {
      type: Number,
      default: 98,
    },
    battery: {
      type: Number,
      required: true,
    },
    signal: {
      type: Number,
      default: 85,
    },
    motionActivity: {
      type: String,
      enum: ['RESTING', 'WALKING', 'RUNNING', 'FALL_DETECTED', 'STATIONARY'],
      default: 'STATIONARY',
    },
    sosTriggered: {
      type: Boolean,
      default: false,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Telemetry', telemetrySchema);
