const app = require('./app');
const PORT = 3000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
