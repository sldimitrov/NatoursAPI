const express = require('express');
const tourRouter = require('./router/tourRouter')
const userRouter = require('./router/userRouter');

const app = express();

// Middleware
app.use(express.json());

// Middleware for mounted routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
