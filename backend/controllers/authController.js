const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const store = require('../services/inMemoryStore');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = store.users.find((u) => u.email.toLowerCase() === email.toLowerCase() || u.officerId.toLowerCase() === email.toLowerCase());

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials or Officer ID not found.' });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { id: user.id, officerId: user.officerId, email: user.email, role: user.role, name: user.name },
      process.env.JWT_SECRET || 'super_secure_military_grade_jwt_secret_key_2026',
      { expiresIn: '24h' }
    );

    store.logAudit('OFFICER_LOGIN', `Officer ${user.name} (${user.officerId}) logged into command terminal.`, user.officerId);

    const userSafe = { ...user };
    delete userSafe.password;

    res.json({
      success: true,
      message: 'Authentication successful',
      token,
      user: userSafe,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = store.users.find((u) => u.id === req.user.id || u.officerId === req.user.officerId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User profile not found' });
    }
    const userSafe = { ...user };
    delete userSafe.password;
    res.json({ success: true, user: userSafe });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getOfficers = async (req, res) => {
  try {
    const safeUsers = store.users.map((u) => {
      const copy = { ...u };
      delete copy.password;
      return copy;
    });
    res.json({ success: true, count: safeUsers.length, officers: safeUsers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { login, getProfile, getOfficers };
