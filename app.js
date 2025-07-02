const express = require('express');

const app = express();

const port = 5000

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})

app.get('/', (req, res) => {
  res.status(200).send({ stats: 'success', message: 'Welcome to the admin dashboard!' });
})

app.post('/', (req, res) => {
  res.status(200).send({ stats: 'success', message: 'POST request received!'});
})