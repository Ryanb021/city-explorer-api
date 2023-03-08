'use strict';

console.log('I am Batman!');

// to creatte a server we are bringing in Express
const express = require('express');


// we need to bring in our .env file, so we'll use this after we have run 'npm i dotenv'
require('dotenv').config();

//read weather data from weather.json file?
let object = require('./data/weather.json');

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
  response.send('Aloha! This is the Batman server!');
});

app.get('/robin', (request, response) => {
  console.log(request.query.name);

  let name = request.query.name;
  response.send('I am Robin! Really');
});

//requesting data from weather.json? Maybe? A ROUTE!!!
//route: http://localhost:3001/weather?city_name=Seattle
app.get('/weather', (request, response, next) => {
  try {
    let cityRequested = request.query.city_name;
    // find the object in the data array from (./data/weather.json) which requires lat, lon, city name as requested    
    let cityDataRequest = object.find(weather => weather.city_name === cityRequested);
    //let selectedLatObject = new Lat(latObject);
    response.send(cityDataRequest);

  }
  catch (error) {
    next(error)

  }

});

// listed last in route list
app.get('*', (req, res) => {
  res.send('The source does not exist');
});

//CLASSES
class Weathers {
  constructor(CityRequest) {
    this.lat = CityRequest.lat;
    this.lon = CityRequest.lon;
  }
}
// ERRORS
app.use((error, reuest, response, next) => {
  response.status(500).send(error.message);
});
//LISTEN, needs server started, tarhets express method that it takes in 2 arguments, needs a port value and a callback function


app.listen(PORT, () => console.log(`listening on ${PORT}`));
