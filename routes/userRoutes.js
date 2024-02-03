// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/', apiController.getWelcomePage);                                                // get all Movies        
router.get('/movies', apiController.getAllMovies);                                                // get all Movies        
router.get('/moviecasting', apiController.getAllMoviesCasting);                                                // get all Movies        
router.get('/movies/filter/:genre', apiController.getMoviesByGenre);                               // get all Movies through genres
router.get('/movies/filter/:genre/:rating', apiController.getMoviesByGenreAndRating);              // get all Movies through genres
router.get('/movies/shorting/:shortBy/:arrange', apiController.getMoviesAfterShorting);            // get all Movies after shorting
router.get('/movies/pagination', apiController.getMoviesAfterPagination);                          // get Movies after pagination
router.get('/movies/casting', apiController.getOneToMany);                                         // get the casting details of movies from other table
router.get('/movies/restore/:id', apiController.restoredata);                                         // get the casting details of movies from other table
router.get('/movies/deletedData', apiController.getDeletedData);                                         // get the casting details of movies from other table


router.post('/movies/add', apiController.createUser);                                             // add user
router.post('/movies/movieandsubtables', apiController.createMoiveAndSubTabels);                                             // add user



router.put('/movies/:id', apiController.updateUser);                                              // update user


router.delete('/movies/:id', apiController.deleteUser);                                           // delete user

module.exports = router;
//here