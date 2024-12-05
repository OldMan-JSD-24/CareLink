const express = require('express');
const {
  addAvailability,
  getFamilyReservations,
  getSchedule,
  bookSchedule,
} = require('../controllers/Schedule.controller');

const router = express.Router();
router.get('/family/:familyId', getFamilyReservations);
// Ajouter des disponibilités
router.post('/availability', addAvailability);


// Obtenir le planning d'une infirmière
router.get('/:userId', getSchedule);
// Obtenir le planning d'une infirmière


// Réserver un créneau
router.post('/book', bookSchedule);

module.exports = router;
