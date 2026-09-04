const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['General', 'Mess & Food', 'Maintenance', 'Rules & Discipline', 'Fees & Accounts', 'Urgent Alert'],
      default: 'General',
    },
    isUrgent: {
      type: Boolean,
      default: false,
    },
    postedBy: {
      type: String,
      default: 'Chief Warden Office',
    },
    targetAudience: {
      type: String,
      enum: ['All Students', 'Boys Hostel', 'Girls Hostel', '1st Year Students'],
      default: 'All Students',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notice', noticeSchema);
