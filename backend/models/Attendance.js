const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },
    records: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        studentName: String,
        rollNo: String,
        roomNumber: String,
        parentName: String,
        parentPhone: String,
        status: {
          type: String,
          enum: ['Present', 'Absent', 'On Leave'],
          default: 'Present',
        },
        remarks: String,
      },
    ],
    markedBy: {
      type: String,
      default: 'Warden on Duty',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Attendance', attendanceSchema);
