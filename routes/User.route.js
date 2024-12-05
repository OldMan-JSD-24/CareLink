const express = require('express');

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser, Login, getAllNurses
} = require('../controllers/User.controller');

const router = express.Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/nurses', getAllNurses);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login', Login);


module.exports = router;