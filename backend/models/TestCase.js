// models/TestCase.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Experiment = require('./Experiment');

const TestCase = sequelize.define('TestCase', {
  userMessage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expectedOutput: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  grader: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Add a foreign key to associate TestCase with an Experiment
TestCase.belongsTo(Experiment);  // One test case belongs to one experiment

module.exports = TestCase;
