require('dotenv').config({ path: './config/.env' }); // Charger les variables d'environnement
const app = require('./app'); // Importer l'application configurée

const PORT = process.env.PORT; // Port par défaut : 3000

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});