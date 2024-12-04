const express = require('express');
const { createReservation, getAllReservations, getPatientsByNurseId } = require('../controllers/Reservation.controller');

const router = express.Router();

router.post('/', createReservation);
router.get('/', getAllReservations);
router.get('/:nurseId/patients', getPatientsByNurseId);

module.exports = router;
