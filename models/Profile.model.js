const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User.model');

const Profile = sequelize.define('Profile', {
    bio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    availability: {
      type: DataTypes.JSON, // Stocke les disponibilités sous forme d'objet ou tableau
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING, // Vous pouvez utiliser STRING pour les numéros, surtout si des indicatifs internationaux sont inclus
      allowNull: false,
      validate: {
        isNumeric: true, // Validation pour s'assurer que seules des valeurs numériques sont acceptées
        len: [8, 15], // Optionnel : Limite la longueur (par ex. : 10 pour un format standard, 15 avec indicatif)
      },
    },
  }, { timestamps: true });
  
  // Relation entre Profile et User (1:1)
  Profile.belongsTo(User, { foreignKey: 'userId' });
  User.hasOne(Profile, { foreignKey: 'userId' });
  
  module.exports = Profile;