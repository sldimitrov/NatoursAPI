const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./router/tourRouter')
const userRouter = require('./router/userRouter');

const app = express();

// Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// Middleware for mounted routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
