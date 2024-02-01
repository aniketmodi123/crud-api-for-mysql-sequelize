// models/dataTable.js
const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const movieModel= sequelize.define(
  'dataTable',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate:{                                                  //validation
        isFloat: true
      }
    },
    publicationYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{                                                  //validation
        isDate: true
      }
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
  { tableName: 'dataTable' }
);


module.exports = movieModel;