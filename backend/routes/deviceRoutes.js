const express = require('express');
const router = express.Router();
const { getDevices, addDevice, updateDevice } = require('../controllers/deviceController');
const auth = require('../middleware/auth');

router.get('/', getDevices);
router.post('/', auth, addDevice);
router.put('/:id', auth, updateDevice);

module.exports = router;
