const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    leaveType: {
      type: String,
      enum: ['Home Visit', 'Medical Emergency', 'Outing / Day Pass', 'Academic Conference', 'Other'],
      required: true,
    },
    fromDate: {
      type: Date,
      required: true,
    },
    toDate: {
      type: Date,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    destinationAddress: {
      type: String,
      required: true,
    },
    emergencyContact: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
    wardenRemarks: {
      type: String,
      default: '',
    },
    passCode: {
      type: String,
      default: () => 'PASS-' + Math.floor(100000 + Math.random() * 900000),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Leave', leaveSchema);
