const { Op } = require('sequelize');
const User = require('../models/User.model');
const Profile = require('../models/Profile.model');

// Rechercher des infirmières
const searchNurses = async (req, res) => {
  try {
    const { location, availability, keyword } = req.query;

    // Construire la condition de recherche
    const conditions = {
      role: 'nurse', // On ne recherche que les infirmières
    };

    if (location) {
      conditions['$Profile.location$'] = { [Op.like]: `%${location}%` }; // Filtrer par localisation
    }

    if (availability) {
      conditions['$Profile.availability$'] = { [Op.like]: `%${availability}%` }; // Filtrer par disponibilité
    }

    if (keyword) {
      conditions['$Profile.bio$'] = { [Op.like]: `%${keyword}%` }; // Filtrer par mot-clé dans la bio
    }

    // Requête pour trouver les infirmières avec leur profil
    const nurses = await User.findAll({
      where: conditions,
      include: {
        model: Profile,
        attributes: ['bio', 'location', 'availability', 'phoneNumber'], // Récupérer les infos utiles du profil
      },
    });

    res.status(200).json(nurses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { searchNurses };
