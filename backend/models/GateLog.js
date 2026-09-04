const mongoose = require('mongoose');

const gateLogSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    rollNo: {
      type: String,
      required: true,
    },
    roomNumber: {
      type: String,
      required: true,
    },
    phone: String,
    parentPhone: String,
    leavePass: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Leave',
    },
    passCode: {
      type: String,
      required: true,
    },
    leaveType: {
      type: String,
      default: 'Outing / Home Visit',
    },
    destination: {
      type: String,
      required: true,
    },
    outTime: {
      type: Date,
      default: Date.now,
    },
    expectedInTime: {
      type: Date,
      required: true,
    },
    inTime: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ['Currently Outside', 'Returned / Inside', 'Overdue Late Return'],
      default: 'Currently Outside',
    },
    gateNumber: {
      type: String,
      default: 'Main Gate 1',
    },
    guardName: {
      type: String,
      default: 'Security Guard',
    },
    securityNotes: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('GateLog', gateLogSchema);
