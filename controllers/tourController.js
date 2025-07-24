const fs = require('fs');

// Read data
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

// Middleware to check ID
exports.checkID = (req, res, next, val) => {
  if (val * 1 > tours.length) {
    return res.status(404).json({
      status: 'failure',
      message: 'Invalid ID'
    })
  }
  next();
}

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'failure',
      message: 'Missing name or price'
    })
  }
  next();
}

// Tour Controllers
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tours: tours
    }
  })
}

exports.getSingleTour = (req, res) => {
  const tourId = req.params.id * 1;
  const tour = tours.find(el => el.id === tourId);

  res.status(200).json({
    status: 'success',
    data: {
      tour: tour
    }
  })
}

exports.createTour = (req, res) => {
  const tourId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: tourId}, req.body);

  tours.push(newTour);
  fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
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
}

exports.updateTour = (req, res) => {
  const tourId = req.params.id * 1;
  const tourIndex = tours.findIndex(el => el.id === tourId);
  const updatedTour = Object.assign(tours[tourIndex], req.body);

  // Update the tour in the array
  tours[tourIndex] = updatedTour;

  fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
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

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  })
}
