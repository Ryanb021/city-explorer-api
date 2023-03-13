'use strict';


const express = require('express');
const cors = require('cors');
require('dotenv').config();
const weather = require('./modules/weather');
const getMovies = require('./modules/movies');
const app = express();
app.use(cors());

app.get('/weather', weatherHandler);
app.get('/movies', getMovies);

const PORT = process.env.PORT || 3002;

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
    .then(summaries => response.status(200).send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(500).send('Sorry. Something went wrong!');
    });
}

app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));
