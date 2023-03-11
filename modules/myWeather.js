'use strict'
const axios = require('axios');



class Weathers {
  constructor(CityWeatherRequest, i) {
    this.date = CityWeatherRequest.data[i].datetime;
    this.description = `Low of ${CityWeatherRequest.data[i].low_temp.toString()}, high of ${CityWeatherRequest.data[i].max_temp.toString()} with ${CityWeatherRequest.data[i].weather.description}`;
  }
}

async function getWeather(request, response, next) {
  try {

    let lat = request.query.lat;
    let lon = request.query.lon;
  
    console.log(lat);
    console.log(lon);

    //let params ={
    //  lat:  lat,
    //  lon: lon,
    //  days: 5,
    // //units: I,
    //  key: process.env.WEATHER_API_KEY

    //};

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

  } catch (error) {
    Promise.resolve().then(() => {
      throw new Error(error.message);
      console.log(error.message);
    }).catch(next);
  }
};

module.exports = getWeather;
