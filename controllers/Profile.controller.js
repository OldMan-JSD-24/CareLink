const Profile = require('../models/Profile.model');
const User = require('../models/User.model');

// Créer un profil pour un utilisateur
const createProfile = async (req, res) => {
  try {
    const { userId, bio, location, availability, phoneNumber } = req.body;
    
    // Vérification si l'utilisateur existe
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    // Création du profil
    const profile = await Profile.create({ userId, bio, location, availability, phoneNumber });
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer le profil d'un utilisateur
const getProfileByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await Profile.findOne({ where: { userId } });
    
    if (!profile) {
      return res.status(404).json({ message: 'Profil non trouvé' });
    }
    
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un profil
const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { bio, location, availability, phoneNumber } = req.body;

    const profile = await Profile.findOne({ where: { userId } });
    if (!profile) {
      return res.status(404).json({ message: 'Profil non trouvé' });
    }

    await profile.update({ bio, location, availability, phoneNumber });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createProfile, getProfileByUserId, updateProfile };
