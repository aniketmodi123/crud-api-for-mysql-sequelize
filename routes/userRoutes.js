// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getWelcomePage);                                                // get all users        
router.get('/movies', userController.getAllUsers);                                                // get all users        
router.get('/moviecasting', userController.getAllMoviesCasting);                                                // get all users        
router.get('/movies/filter/:genre', userController.getUsersByGenre);                               // get all users through genres
router.get('/movies/filter/:genre/:rating', userController.getUsersByGenreAndRating);              // get all users through genres
router.get('/movies/shorting/:shortBy/:arrange', userController.getUsersAfterShorting);            // get all users after shorting
router.get('/movies/pagination', userController.getUsersAfterPagination);                          // get users after pagination
router.get('/movies/casting', userController.getOneToOne);                                         // get the casting details of movies from other table
router.get('/movies/restore/:id', userController.restoredata);                                         // get the casting details of movies from other table
router.get('/movies/deletedData', userController.getDeletedData);                                         // get the casting details of movies from other table



router.post('/movies/add', userController.createUser);                                             // add user



router.put('/movies/:id', userController.updateUser);                                              // update user


router.delete('/movies/:id', userController.deleteUser);                                           // delete user

module.exports = router;
