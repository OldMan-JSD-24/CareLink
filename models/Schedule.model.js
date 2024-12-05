const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const User = require('./User.model');

const Schedule = sequelize.define('Schedule', {
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    startTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    endTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    capacity: {
        type: DataTypes.INTEGER, // Capacité maximale pour ce créneau
        allowNull: false,
        defaultValue: 1, // Par défaut, une seule réservation est possible
    },
    currentBookings: {
        type: DataTypes.INTEGER, // Nombre actuel de patients dans ce créneau
        allowNull: false,
        defaultValue: 0, // Par défaut, aucun patient n'est encore inscrit
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'available', // Créneau disponible par défaut
    },
    familyId: {  // Ajouter un champ pour identifier la famille
        type: DataTypes.INTEGER,
        allowNull: true, // ou false selon votre logique
    },
});

// Relation entre Schedule et Nurse (1:N)
Schedule.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Schedule, { foreignKey: 'userId' });

module.exports = Schedule;
