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

const getMovies = require('./modules/movies');
//use axios to request route, so we require axios in server
const getWeather = require('./modules/myWeather');

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

//movie request route... please work.
app.get('/movies', getMovies);


//requesting data from weather.json? Maybe? A ROUTE!!!
//route: http://localhost:3001/weather?search=Seattle
app.get('/weather', getWeather);



// listed last in route list
app.get('*', (req, res) => {
  res.send('You gotta be kidding me. This crap does not exist!');
});

//CLASSES description.???? I HATE MY LIFE!!!
//class Weathers {
//  constructor(CityWeatherRequest, i) {
//    this.date = CityWeatherRequest.data[i].datetime;
//    this.description = `Low of ${CityWeatherRequest.data[i].low_temp.toString()}, high of ${CityWeatherRequest.data[i].max_temp.toString()} with ${CityWeatherRequest.data[i].weather.description}`;
//  }
//}

// ERRORS
app.use((error, request, response, next) => {
  response.status(500).send(`ERROR MY FRIEND: ${error.message}`);
});
//LISTEN, needs server started, tarhets express method that it takes in 2 arguments, needs a port value and a callback function


app.listen(PORT, () => console.log(`listening on ${PORT}`));

/*
async (request, response, next) => {
  try {

    let lat = request.query.lat;
    let lon = request.query.lon;

    console.log(lat);
    console.log(lon);

    let weatherApi = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&days=5&units=I&key=${process.env.WEATHER_API_KEY}`);

   

    //specific data asking method. whatever.
    //let search = request.query.search;
    // find the object in the data array from (./data/weather.json) which requires lat, lon, city name as requested
    //let cityDataRequest = object.find(i => i.city_name.toLowerCase() === search.toLowerCase());

    //route request for lat and lon

    let latLonRequest = weatherApi.data;

    let renderCityWeather = [];
    for (let k = 0; k < latLonRequest.data.length; k++) {
      let cityWeatherObject = new Weathers(latLonRequest, k);

      renderCityWeather.push(cityWeatherObject);
    }
    // The hell am I doing?
    console.log(renderCityWeather);
    response.send(renderCityWeather);

  }
  catch (error) {
    next(error);

  }
*/
