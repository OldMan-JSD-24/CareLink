const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db'); // Connexion à SQLite
const profileRoutes = require('./routes/Profile.route');
const nurseRoutes = require('./routes/Nurse.route');
const scheduleRoutes = require('./routes/Schedule.route');
const cors = require('cors');

// Ajouter le middleware CORS



// Import des routes
const userRoutes = require('./routes/User.route');
const reservationRoutes = require('./routes/Reservation.route');

const app = express();

app.use(cors({
  origin: 'http://localhost:3001', // Adresse du frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Permettre les cookies
}));
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
app.use('/schedule', scheduleRoutes);
// Export de l'application configurée
module.exports = app;
