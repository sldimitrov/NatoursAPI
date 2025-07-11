const express = require('express');

// User Controllers
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  })
}

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  })
}

const getSingleUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  })
}

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  })
}

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  })
}

// Mounted Routers
const userRouter = express.Router();

// User Routes
userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getSingleUser).patch(updateUser).delete(deleteUser);

module.exports = userRouter;
