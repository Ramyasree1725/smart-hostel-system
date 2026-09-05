const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/settingController');
const auth = require('../middleware/auth');

router.get('/', getSettings);
router.put('/', auth, updateSettings);

module.exports = router;
