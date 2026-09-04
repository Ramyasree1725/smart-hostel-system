const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['gate_pass', 'complaint', 'fee', 'notice', 'general'],
      default: 'gate_pass',
    },
    status: {
      type: String,
      enum: ['unread', 'read'],
      default: 'unread',
    },
    metadata: {
      passCode: String,
      actionStatus: String, // 'Approved', 'Rejected'
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);
