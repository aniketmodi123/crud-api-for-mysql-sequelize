const dataTable = require("./models/dataTable");
const movieCastTable = require("./models/movieCastTable");




dataTable.sync({ alter: false })
.then(() => {
  console.log('movieModel created successfully');
})
.catch((error) => {
  console.error('Error creating table:', error);
});

movieCastTable.sync({ alter: false })
.then(() => {
    console.log('movieCastModel created successfully');
  })
  .catch((error) => {
    console.error('Error creating table:', error);
  });


  dataTable.hasOne(movieCastTable, { foreignKey: 'title', sourceKey: 'title' });    
  movieCastTable.belongsTo(dataTable, { foreignKey: 'title', targetKey: 'title' });
module.exports = {
    dataTable,
    movieCastTable,
  };
