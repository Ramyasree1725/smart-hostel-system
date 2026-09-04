const Leave = require('../models/Leave');
const Notification = require('../models/Notification');

// @desc    Apply for Outing / Leave pass (Student)
// @route   POST /api/leaves
const applyLeave = async (req, res) => {
  try {
    const { leaveType, fromDate, toDate, reason, destinationAddress, emergencyContact } = req.body;

    const leave = await Leave.create({
      student: req.user._id,
      leaveType,
      fromDate,
      toDate,
      reason,
      destinationAddress,
      emergencyContact,
      status: 'Pending',
    });

    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get student's own leave requests
// @route   GET /api/leaves/my
const getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ student: req.user._id }).sort({ createdAt: -1 });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all leave requests (Admin / Warden)
// @route   GET /api/leaves
const getAllLeaves = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    if (status) query.status = status;

    const leaves = await Leave.find(query)
      .populate('student', 'name email rollNo department year phone parentPhone roomNumber')
      .sort({ createdAt: -1 });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update leave status (Warden Approve/Reject & Notify Student)
// @route   PUT /api/leaves/:id
const updateLeaveStatus = async (req, res) => {
  try {
    const { status, wardenRemarks } = req.body;
    const leave = await Leave.findById(req.params.id).populate('student');

    if (!leave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    leave.status = status;
    if (wardenRemarks) leave.wardenRemarks = wardenRemarks;
    const updatedLeave = await leave.save();

    // Create Notification for Student
    await Notification.create({
      recipient: leave.student._id,
      title: status === 'Approved' ? '🎉 Outing Gate Pass APPROVED!' : '⚠️ Leave Request REJECTED',
      message:
        status === 'Approved'
          ? `Your leave request for "${leave.leaveType}" has been approved by Warden madam. Your Pass Code is ${leave.passCode}. Show this at the Security Gate.`
          : `Your leave request was rejected by Warden. Reason: ${wardenRemarks || 'Contact Warden office'}`,
      type: 'gate_pass',
      metadata: {
        passCode: leave.passCode,
        actionStatus: status,
      },
    });

    res.json(updatedLeave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get student notifications
// @route   GET /api/leaves/notifications
const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus,
  getMyNotifications,
};
