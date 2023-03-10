'use strict'
const axios = require('axios');

//CLASSES for movies. AAAAAAHHHHHHHHHHHHHHHH!!!!!!!!!!!
class Movies {
  constructor(searchTomCruise) {
    this.title = searchTomCruise.original_title;
    this.overview = searchTomCruise.overview;
    this.average_votes = searchTomCruise.vote_average;
    this.total_votes = searchTomCruise.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500${searchTomCruise.poster_path}`;
    this.popularity = searchTomCruise.popularity;
    this.released_on = searchTomCruise.release_date;
  }
}

async function getMovies (request, response, next) {
  try{
 
  let tomcruise = request.query.tomcruise;
  let params ={
    api_key: process.env.MOVIE_API_KEY,
    query: tomcruise,
    //language: en-US,
    //page: 1,
    //include_adult: false

  };
  let tomCruiseApi = await axios.get(`https://api.themoviedb.org/3/search/movie`, { params });
  console.log(tomCruiseApi);
  //let tomCruiseResultsApi = await axios.get(tomCruiseApi, { params });
  let sortTomCruiseMovies = tomCruiseApi.data.results.map(i => new Movies(i));
  console.log(sortTomCruiseMovies);
  response.send(sortTomCruiseMovies);
  } catch (error) {
    Promise.resolve().then(() => {
      throw new Error(error.message);
    }).catch(next);
  }
};

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
