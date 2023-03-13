'use strict'
const axios = require('axios');
let cache = require('./cache.js');

//add cache everytime server processess a request from the front end and makes a request to api, we sace the groomed data on this cache, if user search for movies the key is tomcruise
//let cache = {};

//CLASSES for movies. AAAAAAHHHHHHHHHHHHHHHH!!!!!!!!!!!
class Movies {
  constructor(searchTomCruise) {
    this.title = searchTomCruise.original_title;
    this.overview = searchTomCruise.overview;
    this.average_votes = searchTomCruise.vote_average;
    this.total_votes = searchTomCruise.vote_count;
    this.image_url = searchTomCruise.poster_path ? `https://image.tmdb.org/t/p/w500${searchTomCruise.poster_path}` : '';
    this.popularity = searchTomCruise.popularity;
    this.released_on = searchTomCruise.release_date;
  }
}

async function getMovies(request, response, next) {
  try {


    let tomcruise = request.query.tomcruise;
    let key = tomcruise + 'Data';
    //let params = {
    //  api_key: process.env.MOVIE_API_KEY,
    //  query: tomcruise;
    //language: en-US,
    //page: 1,
    //include_adult: false

    let tomCruiseApi = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${tomcruise}&page=1&include_adult=false`);
    console.log(tomCruiseApi);

    let sortTomCruiseMovies = tomCruiseApi.data.results.map(i => new Movies(i));
    console.log(sortTomCruiseMovies);

    let timeToCache = 1000 * 60 * 60 * 24 * 7;
    //let timeToTestCache = 1000 * 20;
    if (cache[key] && Date.now() - cache[key].timestamp < timeToCache) {
      //if the data is already cached and it is recent enough, send the cached data
      console.log('Tom Cruise is already in the cache');
      response.status(200).send(cache[key]);
    } else {
      // if the data is not in the cached (or cached data is too old), request the data from the API
      console.log('It is not in the cache, make the request then cache the data');
      //let tomCruiseApi = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${tomcruise}&page=1&include_adult=false`);
      //console.log(tomCruiseApi);
      //let tomCruiseResultsApi = await axios.get(tomCruiseApi, { params });

      //this is the groomed data
      //let sortTomCruiseMovies = tomCruiseApi.data.results.map(i => new Movies(i));
      //console.log(sortTomCruiseMovies);

      // cache the data for next time
      cache[key] = {
        data: sortTomCruiseMovies,
        timestamp: Date.now()

      }

      response.send(sortTomCruiseMovies).status(200);
    }
  } catch (error) {
    Promise.resolve().then(() => {
      throw new Error(error.message);
    }).catch(next);
  }

}

module.exports = getMovies;

/*
async function getMovies (request, response, next) {
  try{
 
  let tomcruise = request.query.tomcruise;
  let tomCruiseApi = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${tomcruise}&page=1&include_adult=false`);

  let sortTomCruiseMovies = tomCruiseApi.data.results.map(i => new Movies(i));
  console.log(sortTomCruiseMovies);
  response.send(sortTomCruiseMovies);
  } catch (error) {
    next (error);
  }
};

*/
