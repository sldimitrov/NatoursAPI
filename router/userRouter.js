const express = require('express');
const userController = require('../controllers/userController')

// Mounted Routers
const router = express.Router();

// User Routes
router.route('/').get(userController.getAllUsers).post(userController.createUser);
router.route('/:id').get(userController.getSingleUser).patch(userController.updateUser).delete(userController.deleteUser);

module.exports = router;
