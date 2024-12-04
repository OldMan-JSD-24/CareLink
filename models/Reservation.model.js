const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User.model');

const Reservation = sequelize.define('Reservation', {
  date: { type: DataTypes.DATE, allowNull: false },
  status: { 
    type: DataTypes.ENUM('pending', 'confirmed', 'completed'), 
    defaultValue: 'pending' 
  }
}, { timestamps: true });

// Relations entre User et Reservation
Reservation.belongsTo(User, { as: 'family', foreignKey: 'familyId' });
Reservation.belongsTo(User, { as: 'nurse', foreignKey: 'nurseId' });

module.exports = Reservation;
