
const express = require('express');
const {
  createProfile,
  getProfileByUserId,
  updateProfile,
} = require('../controllers/Profile.controller');

const router = express.Router();

// Routes pour les profils
router.post('/', createProfile);
router.get('/:userId', getProfileByUserId);
router.put('/:userId', updateProfile);

module.exports = router;
