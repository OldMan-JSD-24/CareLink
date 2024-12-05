const { Op } = require('sequelize');
const User = require('../models/User.model');
const Profile = require('../models/Profile.model');
const Schedule = require('../models/Schedule.model');

// Rechercher des infirmières
const searchNurses = async (req, res) => {
    try {
        const { location, keyword, date, startTime, endTime } = req.query;

        // Construire la condition pour le modèle Profile
        const profileConditions = {};
        if (location) {
            profileConditions.location = { [Op.like]: `%${location}%` }; // Filtrer par localisation
        }
        if (keyword) {
            profileConditions.bio = { [Op.like]: `%${keyword}%` }; // Filtrer par mot-clé dans la bio
        }

        // Construire la condition pour le modèle Schedule
        const scheduleConditions = {
            status: 'available', // Ne prendre que les créneaux disponibles
        };
        if (date) {
            scheduleConditions.date = date; // Filtrer par date spécifique
        }
        if (startTime && endTime) {
            scheduleConditions[Op.or] = [
                {
                    startTime: { [Op.lte]: endTime }, // Le créneau commence avant la fin de la plage recherchée
                    endTime: { [Op.gte]: startTime }, // Le créneau finit après le début de la plage recherchée
                },
            ];
        }

        // Requête pour trouver les infirmières avec leurs profils et leurs créneaux
        const nurses = await User.findAll({
            where: { role: 'nurse' }, // Filtrer par rôle
            include: [
                {
                    model: Profile,
                    attributes: ['bio', 'location', 'availability', 'phoneNumber'], // Inclure les infos du profil
                    where: profileConditions, // Appliquer les filtres sur le profil
                },
                {
                    model: Schedule,
                    attributes: ['id', 'date', 'startTime', 'endTime', 'capacity', 'currentBookings', 'status'], // Inclure les infos des créneaux
                    where: scheduleConditions, // Appliquer les filtres sur les créneaux
                },
            ],
        });

        // Renvoyer les infirmières avec leurs créneaux disponibles
        res.status(200).json(nurses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { searchNurses };
