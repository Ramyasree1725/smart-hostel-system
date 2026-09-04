const Notice = require('../models/Notice');

// @desc    Get all notices
// @route   GET /api/notices
const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ isUrgent: -1, createdAt: -1 });
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new notice (Admin)
// @route   POST /api/notices
const createNotice = async (req, res) => {
  try {
    const { title, content, category, isUrgent, targetAudience } = req.body;
    const notice = await Notice.create({
      title,
      content,
      category: category || 'General',
      isUrgent: !!isUrgent,
      targetAudience: targetAudience || 'All Students',
      postedBy: req.user.name || 'Chief Warden Office',
    });
    res.status(201).json(notice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete notice (Admin)
// @route   DELETE /api/notices/:id
const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    await notice.deleteOne();
    res.json({ message: 'Notice deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getNotices,
  createNotice,
  deleteNotice,
};
