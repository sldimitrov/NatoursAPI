const express = require('express');
const fs = require('fs');

const PORT = 3000;
const app = express();

// Middleware
app.use(express.json());

// Read data
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

// Tour Controllers
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tours: tours
    }
  })
}

const getSingleTour = (req, res) => {
  const tourId = req.params.id * 1;

  if (tourId > tours.length) {
    res.status(404).json({
      status: 'failure',
      message: 'Tour not found'
    })
  }

  const tour = tours.find(el => el.id === tourId);

  res.status(200).json({
    status: 'success',
    data: {
      tour: tour
    }
  })
}

const createTour = (req, res) => {
  const tourId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: tourId}, req.body);

  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    if (err) {
      return res.status(500).json({
        status: 'failure',
        message: 'Error saving the tour data'
      })
    }

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    })
  })
  res.send('Done');
}

const updateTour = (req, res) => {
  const tourId = req.params.id * 1;
  const tourIndex = tours.findIndex(el => el.id === tourId);

  if (tourIndex === -1) {
    return res.status(404).json({
      status: 'failure',
      message: 'Tour not found'
    })
  }

  const updatedTour = Object.assign(tours[tourIndex], req.body);
  tours[tourIndex] = updatedTour;

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    if (err) {
      res.status(500).json({
        status: 'failure',
        message: 'Error saving the tour data'
      })
    }
  })

  res.status(200).json({
    status: 'success',
    data: {
      tour: updatedTour
    }
  })
}

const deleteTour = (req, res) => {
  const tourId = req.params.id * 1;
  const tourIndex = tours.findIndex(el => el.id === tourId);

  if (tourIndex === -1) {
    res.status(404).json({
      message: ''
    })
  }

  res.status(204).json({
    status: 'success',
    data: null
  })
}

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

// Tour Routes
app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id').get(getSingleTour).patch(updateTour).delete(deleteTour);

// User Routes
app.route('/api/v1/users').get(getAllUsers).post(createUser);
app.route('/api/v1/users/:id').get(getSingleUser).patch(updateUser).delete(deleteUser);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
