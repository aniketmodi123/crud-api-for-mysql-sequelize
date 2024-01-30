// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);                                                // get all users        
router.get('/filter/:genre', userController.getUsersByGenre);                               // get all users through genres
router.get('/filter/:genre/:rating', userController.getUsersByGenreAndRating);              // get all users through genres
router.get('/shorting/:shortBy/:arrange', userController.getUsersAfterShorting);            // get all users after shorting
router.get('/pagination', userController.getUsersAfterPagination);                          // get users after pagination
router.post('/add', userController.createUser);                                             // add user
router.put('/:id', userController.updateUser);                                              // update user
router.delete('/:id', userController.deleteUser);                                           // delete user

module.exports = router;
