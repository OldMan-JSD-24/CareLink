const sequelize = require('./config/db');
const User = require('./models/User.model');
const Profile = require('./models/Profile.model');
const NursePatient = require('./models/NursePatient.model');

const initializeDatabase = async () => {
  try {
    // Synchronisation des modèles avec la base de données
    await sequelize.sync({ force: true }); // `force: true` réinitialise la base de données
    console.log('Base de données synchronisée avec succès !');

    // --- Initialisation des données de test (optionnel) ---
    console.log('Ajout des données de test...');

    // Création de quelques utilisateurs (infirmières et patients)
    const nurse1 = await User.create({
      name: 'nurse1',
      email: 'nurse1@example.com',
      password: 'azerty123',
      role: 'nurse',
    });

    const nurse2 = await User.create({
      name: 'nurse2',
      email: 'nurse2@example.com',
      password: 'azerty123',
      role: 'nurse',
    });

    const patient1 = await User.create({
      name: 'patient1',
      email: 'patient1@example.com',
      password: 'azerty123',
      role: 'patient',
    });

    const patient2 = await User.create({
      name: 'patient2',
      email: 'patient2@example.com',
      password: 'azerty123',
      role: 'patient',
    });

    const patient3 = await User.create({
      name: 'patient3',
      email: 'patient3@example.com',
      password: 'azerty123',
      role: 'patient',
    });

    // Création de profils pour les infirmières
    await Profile.create({
      bio: 'Infirmière expérimentée disponible pour soins à domicile.',
      location: 'Douala',
      availability: { lundi: '8h-12h', mardi: '9h-14h' },
      phoneNumber: '676543210',
      userId: nurse1.id,
    });

    await Profile.create({
      bio: 'Infirmière disponible 24/7 pour services d’urgence.',
      location: 'Yaoundé',
      availability: { mercredi: '8h-16h', jeudi: '10h-18h' },
      phoneNumber: '690123456',
      userId: nurse2.id,
    });

    // Association entre infirmières et patients
    await nurse1.addPatients([patient1, patient2]); // L'infirmière 1 suit les patients 1 et 2
    await nurse2.addPatients([patient3]); // L'infirmière 2 suit le patient 3

    console.log('Données de test ajoutées avec succès !');
  } catch (error) {
    console.error('Erreur lors de la synchronisation de la base de données :', error);
  } finally {
    await sequelize.close();
    console.log('Connexion à la base de données fermée.');
  }
};

// Appel de la fonction
initializeDatabase();
