const Reservation = require('../models/Reservation.model');
const User = require('../models/User.model');
const NursePatient = require('../models/NursePatient.model');
// Créer une réservation
const createReservation = async (req, res) => {
  try {
    const { date, familyId, nurseId } = req.body;
    const reservation = await Reservation.create({ date, familyId, nurseId });
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer les patients associés à une infirmière
const getPatientsByNurseId = async (req, res) => {
    try {
      const { nurseId } = req.params;
  
      // Vérifier si l'utilisateur est une infirmière
      const nurse = await User.findOne({ where: { id: nurseId, role: 'nurse' } });
      if (!nurse) {
        return res.status(404).json({ message: 'Infirmière non trouvée.' });
      }
  
      // Récupérer les patients associés
      const patients = await nurse.getPatients(); // Sequelize gère cette méthode grâce à `belongsToMany`
      res.status(200).json(patients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Récupérer toutes les réservations
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createReservation, getAllReservations, getPatientsByNurseId };
