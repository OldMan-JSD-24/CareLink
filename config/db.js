const { Sequelize } = require('sequelize');

// Configuration de la base de données SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Fichier SQLite
  logging: true // Désactive les logs SQL dans la console
});

module.exports = sequelize;