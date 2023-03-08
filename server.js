'use strict';

console.log('I am Batman!');

// to creatte a server we are bringing in Express
const express = require('express');


// we need to bring in our .env file, so we'll use this after we have run 'npm i dotenv'
require('dotenv').config();

//read weather data from weather.json file?
let weatherData = require('./data/weather.json');

// we must include cors if we want to share resources over the web
const cors = require('cors');

// USE
// once we require something, we have to use it
// this is where we assign  the required file a variable
// react does this in one step with import, it says we must use it and it assigns it to a variable
// express takes 2 steps: require and use

// once we have express we must use it
const app = express();
app.use(cors());

// define a PORT & validate env is working
const PORT = process.env.PORT || 3002;
// if my server is running on 3002, I know something is wrong with either my .env file or how I'm importing it.

// ROUTES
// we will use these to access our endpoints

// define our default route
// app.get() correlates to axios.get()
// the first arugment is a URL in quote
// the second is the callback that defines what should happen when aa request comes into that url
app.get('/', (request, response) => {
  response.send('Aloha! This is the server of Batman!');
});

app.get('/weather', (request, response) => {
  console.log(request.query.lat);

  let lat = request.query.lat;
  response.send('I am Robin!');
});

//requesting data from weather.json? Maybe?
app.get('./data/weather', request, response, next) => {
  try {
    let dataRequested = request.query.lat;
// find the lat in the data array from (./data/weather.json) which requires lat as requested    
let latObject = data.find();
let selectedLatObject = new Lat(latObject);
respond.send(selectedLatObject);

  } catch (error) {
    next(error)
  
  }
}

//LISTEN, needs server started, tarhets express method that it takes in 2 arguments, needs a port value and a callback function


app.listen(PORT, () => console.log(`listening on ${PORT}`));
