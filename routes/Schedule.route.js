const express = require('express');
const {
  addAvailability,
  getSchedule,
  bookSchedule,
  
} = require('../controllers/Schedule.controller');

const router = express.Router();

// Ajouter des disponibilités
router.post('/availability', addAvailability);

// Obtenir le planning d'une infirmière
router.get('/:userId', getSchedule);

// Réserver un créneau
router.post('/book', bookSchedule);

module.exports = router;
