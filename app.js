const express = require('express');
const fs = require('fs');

const PORT = 3000;
const app = express();
app.use(express.json());


const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tours: tours
    }
  })
})

app.get('/api/v1/tours/:id', (req, res) => {
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
})

app.post('/api/v1/tours', (req, res) => {
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
})

app.patch('/api/v1/tours/:id', (req, res) => {
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
})

app.delete('/api/v1/tours/:id', (req, res) => {
  const tourId = req.params.id * 1;
  const tourIndex = tours.findIndex(el => el.id === tourId);

  if (tourIndex === -1) {
    res.status(404).json({
      message: ''
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
