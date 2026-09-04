const Room = require('../models/Room');
const User = require('../models/User');
const Fee = require('../models/Fee');
const Complaint = require('../models/Complaint');
const Leave = require('../models/Leave');

// @desc    Get complete hostel dashboard analytics & charts data
// @route   GET /api/analytics/dashboard
const getDashboardAnalytics = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const allocatedStudents = await User.countDocuments({ role: 'student', room: { $ne: null } });
    const pendingAllocation = totalStudents - allocatedStudents;

    const rooms = await Room.find();
    const totalRooms = rooms.length;
    let totalCapacity = 0;
    let totalOccupied = 0;

    rooms.forEach((r) => {
      totalCapacity += r.capacity;
      totalOccupied += r.occupied;
    });

    const vacantBeds = Math.max(0, totalCapacity - totalOccupied);
    const occupancyRate = totalCapacity > 0 ? Math.round((totalOccupied / totalCapacity) * 100) : 0;

    // Fee summary
    const fees = await Fee.find();
    let totalFeeBilled = 0;
    let totalFeeCollected = 0;
    let totalFeePending = 0;

    fees.forEach((f) => {
      totalFeeBilled += f.totalAmount || 0;
      totalFeeCollected += f.paidAmount || 0;
      totalFeePending += f.dueAmount || 0;
    });

    // Complaints summary
    const totalComplaints = await Complaint.countDocuments();
    const pendingComplaints = await Complaint.countDocuments({ status: { $in: ['Pending', 'Assigned', 'In Progress'] } });
    const resolvedComplaints = await Complaint.countDocuments({ status: 'Resolved' });
    const emergencyComplaints = await Complaint.countDocuments({ priority: 'Emergency', status: { $ne: 'Resolved' } });

    // Category breakdown
    const complaintsByCategory = await Complaint.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $project: { category: '$_id', count: 1, _id: 0 } },
    ]);

    // Priority breakdown
    const complaintsByPriority = await Complaint.aggregate([
      { $group: { _id: '$priority', count: { $sum: 1 } } },
      { $project: { priority: '$_id', count: 1, _id: 0 } },
    ]);

    // Leaves summary
    const pendingLeaves = await Leave.countDocuments({ status: 'Pending' });

    // Monthly revenue simulation data for charts
    const monthlyRevenue = [
      { month: 'Jul', collected: 120000, target: 150000 },
      { month: 'Aug', collected: 210000, target: 200000 },
      { month: 'Sep', collected: 340000, target: 300000 },
      { month: 'Oct', collected: 290000, target: 300000 },
      { month: 'Nov', collected: 180000, target: 200000 },
      { month: 'Dec', collected: 420000, target: 400000 },
    ];

    // Block-wise occupancy
    const blockOccupancy = [
      { block: 'Block A (Boys)', occupied: 42, capacity: 50, rate: 84 },
      { block: 'Block B (Girls)', occupied: 38, capacity: 45, rate: 84.4 },
      { block: 'Deluxe Wing', occupied: 18, capacity: 20, rate: 90 },
      { block: 'Block C (Freshers)', occupied: 28, capacity: 35, rate: 80 },
    ];

    res.json({
      summary: {
        totalStudents,
        allocatedStudents,
        pendingAllocation,
        totalRooms,
        totalCapacity,
        totalOccupied,
        vacantBeds,
        occupancyRate,
        totalFeeBilled,
        totalFeeCollected,
        totalFeePending,
        totalComplaints,
        pendingComplaints,
        resolvedComplaints,
        emergencyComplaints,
        pendingLeaves,
      },
      charts: {
        complaintsByCategory,
        complaintsByPriority,
        monthlyRevenue,
        blockOccupancy,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardAnalytics };
