const Reservation = require('../models/Reservation.model');
const Schedule = require('../models/Schedule.model');

// Ajouter des disponibilités
const addAvailability = async (req, res) => {
  try {
    const { userId, date, startTime, endTime } = req.body;

    // Vérifier les données
    if (!userId || !date || !startTime || !endTime) {
      return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
    }

    // Ajouter la disponibilité
    const availability = await Schedule.create({
      userId,
      date,
      startTime,
      endTime,
      status: 'available',
    });

    res.status(201).json(availability);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtenir le planning d'une infirmière
const getSchedule = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("j'intercepte")
    // Récupérer le planning
    const schedule = await Schedule.findAll({
      where: { userId },
      order: [['date', 'ASC'], ['startTime', 'ASC']],
    });

    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFamilyReservations = async (req, res) => {

    console.log("Je suis inocent");
    try {
      const { familyId } = req.params;  // Utilisation de familyId passé dans les paramètres de la requête
      console.log('params',req.params)
      // Vérifier que familyId est fourni
      if (!familyId) {
        return res.status(400).json({ error: 'familyId est requis' });
      }
  
      // Récupérer les réservations pour la famille
      const reservations = await Schedule.findAll({
        where: { familyId },
        order: [['date', 'ASC'], ['startTime', 'ASC']],
      });
      console.log("reservation", reservations)
      if (!reservations || reservations.length === 0) {
        return res.status(404).json({ error: 'Aucune réservation trouvée pour cette famille' });
      }
      
      console.log('zaaaaaaaaaaaaa',reservations)
      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Réserver un créneau

const bookSchedule = async (req, res) => {
    try {
        const { scheduleId, familyid } = req.body; // ID du créneau à réserver
        console.log("id fam : ", req.body);
        // Récupérer le créneau
        const schedule = await Schedule.findByPk(scheduleId);
        schedule.familyId = familyid
        if (!schedule) {
            return res.status(404).json({ error: 'Schedule not found' });
        }

        // Vérifier si le créneau est déjà saturé
        if (schedule.currentBookings >= schedule.capacity) {
            return res.status(400).json({ error: 'Schedule is already saturated' });
        }

        // Incrémenter le nombre de réservations actuelles
        schedule.currentBookings += 1;

        // Vérifier si le créneau est maintenant saturé
        if (schedule.currentBookings >= schedule.capacity) {
            schedule.status = 'saturated';
        }

        // Sauvegarder les modifications
        await schedule.save();

        res.status(200).json({ message: 'Schedule booked successfully', schedule });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = { getFamilyReservations, addAvailability, getSchedule, bookSchedule };
