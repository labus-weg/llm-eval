// models/ExperimentResult.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Experiment = require('./Experiment');
const TestCase = require('./TestCase');

const ExperimentResult = sequelize.define('ExperimentResult', {
  result: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
});

// Associations
ExperimentResult.belongsTo(Experiment);  // Result belongs to an experiment
ExperimentResult.belongsTo(TestCase);   // Result belongs to a test case

module.exports = ExperimentResult;
