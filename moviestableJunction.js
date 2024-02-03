const moviestable = require("./models/moviestable");
const movieCastTable = require("./models/movieCastTable");
const movieAuthorTable = require("./models/movieautorTable");




// moviestable.sync({ alter: false })
// .then(() => {
//   console.log('movieModel created successfully');
// })
// .catch((error) => {
//   console.error('Error creating table:', error);
// });

// movieCastTable.sync({ alter: false })
// .then(() => {
//     console.log('movieCastModel created successfully');
//   })
//   .catch((error) => {
//     console.error('Error creating table:', error);
//   });


  // moviestable.hasOne(movieCastTable, { foreignKey: 'title', sourceKey: 'title' });                //one to one relationship 
  // movieCastTable.belongsTo(moviestable, { foreignKey: 'title', targetKey: 'title' });

  moviestable.hasMany(movieCastTable, { foreignKey: 'title', sourceKey: 'title' });                //one to many relationship 
  movieCastTable.belongsTo(moviestable, { foreignKey: 'title', targetKey: 'title' });

  moviestable.hasMany(movieAuthorTable, { foreignKey: 'title', sourceKey: 'title' });                //one to many relationship 
  movieAuthorTable.belongsTo(moviestable, { foreignKey: 'title', targetKey: 'title' });
  
module.exports = {
    moviestable,
    movieCastTable,
    movieAuthorTable,
  };