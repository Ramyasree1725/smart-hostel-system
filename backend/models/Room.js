const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: true,
      unique: true,
    },
    block: {
      type: String,
      required: true, // e.g. "Block A (Boys)", "Block B (Girls)", "Deluxe Wing"
    },
    floor: {
      type: Number,
      required: true,
      default: 1,
    },
    type: {
      type: String,
      enum: ['Single AC', 'Single Non-AC', 'Double AC', 'Double Non-AC', 'Triple Non-AC'],
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
      default: 2,
    },
    occupied: {
      type: Number,
      default: 0,
    },
    feePerSemester: {
      type: Number,
      required: true,
      default: 45000,
    },
    amenities: {
      type: [String],
      default: ['High Speed Wi-Fi', 'Attached Bathroom', 'Study Table & Chair', 'Wardrobe', 'Balcony'],
    },
    occupants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    status: {
      type: String,
      enum: ['Available', 'Full', 'Under Maintenance'],
      default: 'Available',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Room', roomSchema);
