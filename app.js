const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db'); // Connexion à SQLite
const profileRoutes = require('./routes/Profile.route');
const nurseRoutes = require('./routes/Nurse.route');


// Import des routes
const userRoutes = require('./routes/User.route');
const reservationRoutes = require('./routes/Reservation.route');

const app = express();

// Middleware pour parser les requêtes JSON
app.use(bodyParser.json());

// Test de connectivité
app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API CareLink!');
});

// Utilisation des routes
app.use('/users', userRoutes);
app.use('/reservations', reservationRoutes);
app.use('/profiles', profileRoutes);
app.use('/nurses', nurseRoutes);
// Export de l'application configurée
module.exports = app;
