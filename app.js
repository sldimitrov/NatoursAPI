const express = require('express');
const fs = require('fs');
const tourRouter = require('./router/tourRouter')
const userRouter = require('./router/userRouter');

const PORT = 3000;
const app = express();

// Middleware
app.use(express.json());

// Middleware for mounted routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
