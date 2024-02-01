const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASENAME, process.env.DBUSERNAME,process.env.PASSWORD , {
  host: 'localhost',
  logging: false,
  dialect: 'mysql',
});
sequelize.sync({force:false});
sequelize
  .authenticate()
  .then(() => {
    console.log("connection made successfully");
  })
  .catch((err) => console.log(err, "this has a error"));

module.exports = sequelize;
