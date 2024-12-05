const sequelize = require('./config/db');
const User = require('./models/User.model');
const Profile = require('./models/Profile.model');
const NursePatient = require('./models/NursePatient.model');
const Schedule = require('./models/Schedule.model')

const initializeDatabase = async () => {
  try {
    // Synchronisation des modèles avec la base de données
    await sequelize.sync({ force: true }); // `force: true` réinitialise la base de données
    console.log('Base de données synchronisée avec succès !');

    // --- Initialisation des données de test (optionnel) ---
    console.log('Ajout des données de test...');

    // Création de plusieurs utilisateurs
    const nurses = await User.bulkCreate([
      { name: 'nurse_marie', email: 'marie.ngono@example.com', password: 'password123', role: 'nurse' },
      { name: 'nurse_chantal', email: 'chantal.ndong@example.com', password: 'password123', role: 'nurse' },
      { name: 'nurse_juliette', email: 'juliette.essomba@example.com', password: 'password123', role: 'nurse' },
  ]);
console.log(nurses)
  // Ajout des profils correspondants
  await Profile.bulkCreate([
      {
          bio: 'Infirmière expérimentée en soins à domicile pour les personnes âgées.',
          location: 'Yaoundé - Bastos, Etoudi',
          availability: null,
          phoneNumber: '654789321',
          userId: nurses[0].id,
      },
      {
          bio: 'Infirmière spécialisée en pédiatrie et soins des nourrissons.',
          location: 'Douala - Bonapriso, Akwa Nord',
          availability: null,
          phoneNumber: '672345678',
          userId: nurses[1].id,
      },
      {
          bio: 'Infirmière polyvalente, disponible pour les soins de base et conseils médicaux.',
          location: 'Bafoussam - Tamdja, Banengo',
          availability: null,
          phoneNumber: '698123456',
          userId: nurses[2].id,
      },
  ]);

  // Création des créneaux horaires (Schedules)
  await Schedule.bulkCreate([
      // Créneaux pour Marie (Yaoundé)
      {
          date: '2024-12-10',
          startTime: '08:00',
          endTime: '12:00',
          capacity: 3,
          currentBookings: 1,
          status: 'available',
          userId: nurses[0].id,
      },
      {
          date: '2024-12-10',
          startTime: '14:00',
          endTime: '18:00',
          capacity: 4,
          currentBookings: 4,
          status: 'saturated',
          userId: nurses[0].id,
      },
      // Créneaux pour Chantal (Douala)
      {
          date: '2024-12-10',
          startTime: '09:00',
          endTime: '11:00',
          capacity: 5,
          currentBookings: 2,
          status: 'available',
          userId: nurses[1].id,
      },
      {
          date: '2024-12-11',
          startTime: '13:00',
          endTime: '16:00',
          capacity: 2,
          currentBookings: 0,
          status: 'available',
          userId: nurses[1].id,
      },
      // Créneaux pour Juliette (Bafoussam)
      {
          date: '2024-12-11',
          startTime: '08:00',
          endTime: '12:00',
          capacity: 3,
          currentBookings: 1,
          status: 'available',
          userId: nurses[2].id,
      },
      {
          date: '2024-12-11',
          startTime: '14:00',
          endTime: '18:00',
          capacity: 3,
          currentBookings: 3,
          status: 'saturated',
          userId: nurses[2].id,
      },
  ]);


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
