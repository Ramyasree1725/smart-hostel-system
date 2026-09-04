const GateLog = require('../models/GateLog');
const Leave = require('../models/Leave');
const User = require('../models/User');

// @desc    Verify Gate Pass code by Security Guard
// @route   POST /api/gate/verify-pass
const verifyGatePass = async (req, res) => {
  try {
    const { passCode, rollNo } = req.body;
    let query = { status: 'Approved' };

    if (passCode) query.passCode = passCode.trim().toUpperCase();
    if (rollNo) {
      const student = await User.findOne({ rollNo: rollNo.trim() });
      if (student) query.student = student._id;
    }

    const leave = await Leave.findOne(query).populate('student', 'name rollNo roomNumber phone parentPhone avatar department');

    if (!leave) {
      return res.status(404).json({
        valid: false,
        message: '❌ Invalid or Unapproved Pass! No active approved gate pass found with these credentials.',
      });
    }

    // Check if student already checked out
    const activeLog = await GateLog.findOne({
      leavePass: leave._id,
      status: 'Currently Outside',
    });

    res.json({
      valid: true,
      message: '✅ Gate Pass Verified & Validated!',
      leave,
      isCheckedOut: !!activeLog,
      activeLog,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Record Student Exit (Check-Out)
// @route   POST /api/gate/check-out
const recordCheckOut = async (req, res) => {
  try {
    const { passCode, securityNotes, gateNumber } = req.body;
    const leave = await Leave.findOne({ passCode: passCode.trim().toUpperCase(), status: 'Approved' }).populate('student');

    if (!leave) {
      return res.status(404).json({ message: 'Approved leave pass not found' });
    }

    // Ensure student is not already outside
    const existingLog = await GateLog.findOne({ leavePass: leave._id, status: 'Currently Outside' });
    if (existingLog) {
      return res.status(400).json({ message: `Student ${leave.student.name} is already recorded as Outside (Checked out at ${new Date(existingLog.outTime).toLocaleTimeString()})` });
    }

    const newLog = await GateLog.create({
      student: leave.student._id,
      studentName: leave.student.name,
      rollNo: leave.student.rollNo,
      roomNumber: leave.student.roomNumber,
      phone: leave.student.phone,
      parentPhone: leave.student.parentPhone,
      leavePass: leave._id,
      passCode: leave.passCode,
      leaveType: leave.leaveType,
      destination: leave.destinationAddress,
      outTime: new Date(),
      expectedInTime: leave.toDate,
      status: 'Currently Outside',
      gateNumber: gateNumber || 'Main Gate 1',
      guardName: req.user?.name || 'Security Officer',
      securityNotes: securityNotes || '',
    });

    res.status(201).json({
      success: true,
      message: `🚪 Check-Out Recorded for ${leave.student.name} at ${new Date().toLocaleTimeString('en-IN')}`,
      gateLog: newLog,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Record Student Return (Check-In)
// @route   POST /api/gate/check-in
const recordCheckIn = async (req, res) => {
  try {
    const { passCode, securityNotes } = req.body;
    const log = await GateLog.findOne({
      passCode: passCode.trim().toUpperCase(),
      status: 'Currently Outside',
    });

    if (!log) {
      return res.status(404).json({ message: 'No active Outside movement record found for this pass code' });
    }

    log.inTime = new Date();
    log.status = 'Returned / Inside';
    if (securityNotes) log.securityNotes = `${log.securityNotes} | Return Note: ${securityNotes}`;
    await log.save();

    res.json({
      success: true,
      message: `🏠 Check-In Recorded: ${log.studentName} returned to hostel at ${new Date().toLocaleTimeString('en-IN')}`,
      gateLog: log,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get live gate movement attendance log
// @route   GET /api/gate/logs
const getGateLogs = async (req, res) => {
  try {
    const { status, date } = req.query;
    let query = {};
    if (status) query.status = status;

    const logs = await GateLog.find(query).sort({ createdAt: -1 });
    const currentlyOutsideCount = await GateLog.countDocuments({ status: 'Currently Outside' });
    const todayTotalExits = await GateLog.countDocuments({
      outTime: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
    });

    res.json({
      logs,
      stats: {
        currentlyOutside: currentlyOutsideCount,
        todayTotalExits,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  verifyGatePass,
  recordCheckOut,
  recordCheckIn,
  getGateLogs,
};
