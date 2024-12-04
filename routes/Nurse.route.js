const express = require('express');
const { searchNurses } = require('../controllers/Nurse.controller');

const router = express.Router();

// Route pour rechercher des infirmières
router.get('/search', searchNurses);

module.exports = router;
