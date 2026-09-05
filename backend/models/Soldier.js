const mongoose = require('mongoose');

const soldierSchema = new mongoose.Schema(
  {
    soldierId: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    rank: {
      type: String,
      default: 'Sergeant',
    },
    unit: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      default: 'O+Pos',
    },
    emergencyContact: {
      type: String,
      default: '+91-9876543210',
    },
    deviceId: {
      type: String,
      default: null,
    },
    monitoringStatus: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'STANDBY', 'EMERGENCY', 'OFFLINE'],
      default: 'ACTIVE',
    },
    healthStatus: {
      type: String,
      enum: ['NORMAL', 'WARNING', 'CRITICAL'],
      default: 'NORMAL',
    },
    lastHeartRate: {
      type: Number,
      default: 75,
    },
    lastTemperature: {
      type: Number,
      default: 36.6,
    },
    lastBattery: {
      type: Number,
      default: 95,
    },
    lastLocation: {
      lat: { type: Number, default: 17.440081 },
      lng: { type: Number, default: 78.348915 },
      address: { type: String, default: 'Sector Alpha Base' },
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Soldier', soldierSchema);
