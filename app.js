const express = require('express');
const fs = require('fs');

const PORT = 3001;
const app = express();
app.use(express.json());


const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

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

  console.log(req.body);
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

// Old Syntax
// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getSingleTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

// Using Router
app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id').get(getSingleTour).patch(updateTour).delete(deleteTour);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
