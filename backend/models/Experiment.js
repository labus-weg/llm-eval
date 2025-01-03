// models/Experiment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Experiment = sequelize.define('Experiment', {
  prompt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  modelName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  provider: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Experiment;
