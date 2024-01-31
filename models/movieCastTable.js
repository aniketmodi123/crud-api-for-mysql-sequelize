// models/movieCastTable.js
const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const movieCastModel= sequelize.define(
  'movieCastTable',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    leadActor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    leadActress : {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
      get() {
        return this.getDataValue('createdAt').toLocaleString();   //this convert it to string exp=> "1/29/2024, 5:48:25 PM"
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('NOW'),
      allowNull: false,
      get() {
        return this.getDataValue('updatedAt').toLocaleString();   //this convert it to string exp=> "1/29/2024, 5:48:25 PM"
      },
    }
  },
  { tableName: 'movieCastTable' }
);



module.exports = movieCastModel;