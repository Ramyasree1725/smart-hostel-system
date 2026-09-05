const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    maxHeartRate: {
      type: Number,
      default: 120,
    },
    minHeartRate: {
      type: Number,
      default: 50,
    },
    maxTemperature: {
      type: Number,
      default: 38.5, // Celsius
    },
    minTemperature: {
      type: Number,
      default: 35.0,
    },
    minSpO2: {
      type: Number,
      default: 90, // %
    },
    lowBatteryThreshold: {
      type: Number,
      default: 20, // %
    },
    offlineTimeoutSeconds: {
      type: Number,
      default: 60,
    },
    geofenceCenter: {
      lat: { type: Number, default: 17.440081 },
      lng: { type: Number, default: 78.348915 },
    },
    geofenceRadiusKm: {
      type: Number,
      default: 5.0,
    },
    enableAutoAlerts: {
      type: Boolean,
      default: true,
    },
    enableSoundAlarms: {
      type: Boolean,
      default: true,
    },
    simulationIntervalMs: {
      type: Number,
      default: 3000,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Setting', settingSchema);
