const express = require('express');
const tourRouter = require('./router/tourRouter')
const userRouter = require('./router/userRouter');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// Middleware for mounted routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
