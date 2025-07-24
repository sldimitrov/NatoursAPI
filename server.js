const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

console.log(process.env.NODE_ENV);

const PORT = process.env.PORT || 3000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
