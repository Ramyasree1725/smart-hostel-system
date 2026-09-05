const express = require('express');
const router = express.Router();
const { getSoldiers, getSoldierById, addSoldier, updateSoldier, deleteSoldier } = require('../controllers/soldierController');
const auth = require('../middleware/auth');

router.get('/', getSoldiers);
router.get('/:id', getSoldierById);
router.post('/', auth, addSoldier);
router.put('/:id', auth, updateSoldier);
router.delete('/:id', auth, deleteSoldier);

module.exports = router;
