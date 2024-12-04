const sequelize = require('../config/db');
const User = require('../models/User.model');
const NursePatient = sequelize.define('NursePatient', {}, { timestamps: false });


// Relation Many-to-Many entre infirmière et patients
User.belongsToMany(User, {
  as: 'patients', // Alias pour identifier les patients d'une infirmière
  through: NursePatient,
  foreignKey: 'nurseId',
  otherKey: 'patientId',
});

User.belongsToMany(User, {
  as: 'nurses', // Alias pour identifier les infirmières d'un patient
  through: NursePatient,
  foreignKey: 'patientId',
  otherKey: 'nurseId',
});

module.exports = NursePatient;
