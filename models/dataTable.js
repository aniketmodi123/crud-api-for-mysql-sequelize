// models/dataTable.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const userModel= sequelize.define(
  'dataTable',
  {
    title: Sequelize.STRING,
    desc: Sequelize.TEXT,
  },
  { tableName: 'dataTable' }
);

module.exports = userModel;