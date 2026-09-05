const express = require('express');
const router = express.Router();
const { login, getProfile, getOfficers } = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/login', login);
router.get('/profile', auth, getProfile);
router.get('/officers', auth, getOfficers);

module.exports = router;
