const Complaint = require('../models/Complaint');

// Keyword-based Smart Priority Classifier
const detectComplaintPriority = (title, description, category) => {
  const combined = `${title} ${description}`.toLowerCase();

  // Emergency keywords
  const emergencyKeywords = [
    'spark', 'fire', 'smoke', 'electric shock', 'short circuit', 'flood',
    'heavy leak', 'gas leak', 'medical emergency', 'theft', 'break-in', 'ceiling crack'
  ];

  // High priority keywords
  const highKeywords = [
    'no water', 'toilet blocked', 'drainage overflow', 'ac not working',
    'power cut', 'no power', 'broken lock', 'food smell', 'spoiled food', 'roaches', 'pest'
  ];

  // Medium priority keywords
  const mediumKeywords = [
    'wifi slow', 'internet down', 'fan noise', 'tap leaking',
    'light not working', 'bulb fused', 'switch loose', 'mattress'
  ];

  for (const kw of emergencyKeywords) {
    if (combined.includes(kw)) return 'Emergency';
  }

  for (const kw of highKeywords) {
    if (combined.includes(kw)) return 'High';
  }

  for (const kw of mediumKeywords) {
    if (combined.includes(kw)) return 'Medium';
  }

  // Category fallback
  if (category === 'Electrical' || category === 'Security') return 'High';
  if (category === 'Plumbing' || category === 'Food & Mess') return 'Medium';

  return 'Low';
};

// @desc    Create new complaint
// @route   POST /api/complaints
const createComplaint = async (req, res) => {
  try {
    const { title, description, category, roomNumber } = req.body;

    const detectedPriority = detectComplaintPriority(title, description, category);
    const priority = req.body.priority || detectedPriority;

    const complaint = await Complaint.create({
      student: req.user._id,
      roomNumber: roomNumber || req.user.roomNumber || 'N/A',
      title,
      description,
      category,
      priority,
      status: 'Pending',
    });

    res.status(201).json({
      complaint,
      detectedPriority,
      isAutoClassified: priority === detectedPriority,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in student complaints
// @route   GET /api/complaints/my
const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ student: req.user._id }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all complaints (Admin)
// @route   GET /api/complaints
const getAllComplaints = async (req, res) => {
  try {
    const { status, category, priority } = req.query;
    let query = {};
    if (status) query.status = status;
    if (category) query.category = category;
    if (priority) query.priority = priority;

    const complaints = await Complaint.find(query)
      .populate('student', 'name email rollNo phone roomNumber')
      .sort({
        // Priority ordering: Emergency -> High -> Medium -> Low
        priority: 1,
        createdAt: -1,
      });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update complaint status & assignment (Admin)
// @route   PUT /api/complaints/:id
const updateComplaintStatus = async (req, res) => {
  try {
    const { status, assignedTo, adminNotes, priority } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    if (status) complaint.status = status;
    if (assignedTo) complaint.assignedTo = assignedTo;
    if (adminNotes) complaint.adminNotes = adminNotes;
    if (priority) complaint.priority = priority;

    if (status === 'Resolved') {
      complaint.resolvedAt = new Date();
    }

    const updatedComplaint = await complaint.save();
    res.json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete complaint
// @route   DELETE /api/complaints/:id
const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    await complaint.deleteOne();
    res.json({ message: 'Complaint removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus,
  deleteComplaint,
  detectComplaintPriority,
};
