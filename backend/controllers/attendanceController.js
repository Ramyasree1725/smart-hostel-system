const Attendance = require('../models/Attendance');
const User = require('../models/User');

// @desc    Get attendance for a date (or today)
// @route   GET /api/attendance
const getAttendanceByDate = async (req, res) => {
  try {
    const dateStr = req.query.date || new Date().toISOString().split('T')[0];
    let record = await Attendance.findOne({ date: dateStr }).populate('records.student', 'name rollNo department roomNumber phone parentName parentPhone');

    // If no attendance record initialized for this date, build from active students
    if (!record) {
      const activeStudents = await User.find({ role: 'student' }).select('name rollNo department roomNumber parentName parentPhone');
      const records = activeStudents.map((stu) => ({
        student: stu._id,
        studentName: stu.name,
        rollNo: stu.rollNo || 'N/A',
        roomNumber: stu.roomNumber || 'Unassigned',
        parentName: stu.parentName || 'Parent / Guardian',
        parentPhone: stu.parentPhone || '+91 9123456780',
        status: 'Present',
        remarks: '',
      }));

      record = {
        date: dateStr,
        records,
        markedBy: 'Not yet recorded',
      };
    }

    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Save/Submit attendance roll call (Admin)
// @route   POST /api/attendance
const saveAttendance = async (req, res) => {
  try {
    const { date, records } = req.body;
    const dateStr = date || new Date().toISOString().split('T')[0];

    let attendance = await Attendance.findOne({ date: dateStr });
    if (attendance) {
      attendance.records = records;
      attendance.markedBy = req.user.name || 'Warden';
      await attendance.save();
    } else {
      attendance = await Attendance.create({
        date: dateStr,
        records,
        markedBy: req.user.name || 'Warden',
      });
    }

    res.json({ success: true, message: 'Attendance recorded successfully', attendance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAttendanceByDate,
  saveAttendance,
};
