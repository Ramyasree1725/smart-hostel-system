const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema(
  {
    alertId: {
      type: String,
      required: true,
      unique: true,
    },
    soldierId: {
      type: String,
      required: true,
      index: true,
    },
    soldierName: {
      type: String,
      default: 'Unknown Soldier',
    },
    deviceId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        'HIGH_HEART_RATE',
        'LOW_HEART_RATE',
        'HIGH_TEMPERATURE',
        'LOW_TEMPERATURE',
        'LOW_SPO2',
        'LOW_BATTERY',
        'DEVICE_OFFLINE',
        'GPS_LOST',
        'GEOFENCE_BREACH',
        'FALL_DETECTED',
        'SOS_MANUAL_TRIGGER',
      ],
      required: true,
    },
    severity: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
      default: 'MEDIUM',
    },
    message: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'ACKNOWLEDGED', 'RESOLVED'],
      default: 'ACTIVE',
    },
    acknowledgedBy: {
      type: String,
      default: null,
    },
    acknowledgedAt: {
      type: Date,
      default: null,
    },
    location: {
      lat: Number,
      lng: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Alert', alertSchema);
