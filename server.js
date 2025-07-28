const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app')

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(con => console.log('DB connection successful!'))

// const newTour = new Tour({
//   name: 'The Mushroom Adventure',
//   price: 497,
// })

// newTour.save()
  // .then(doc => {
  //   console.log(doc);
  // })
  // .catch(err => {
  //   console.log('Error saving tour: ', err)
  // })


const PORT = process.env.PORT || 3000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
