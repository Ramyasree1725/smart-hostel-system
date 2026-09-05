const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
  {
    soldierId: {
      type: String,
      required: true,
      index: true,
    },
    deviceId: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    altitude: {
      type: Number,
      default: 540, // meters
    },
    speed: {
      type: Number,
      default: 0, // km/h
    },
    heading: {
      type: Number,
      default: 0, // degrees
    },
    accuracy: {
      type: Number,
      default: 2.5, // meters
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Location', locationSchema);
