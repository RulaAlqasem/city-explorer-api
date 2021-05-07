
const superagent = require('superagent');
require('dotenv').config()

const MOVIE_BIT_KEY=process.env.MOVIE_BIT_KEY;

let movieCity= (req, res) =>{
    try {
      console.log(req.query);
      const movieData=`https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_BIT_KEY}&query=${req.query.query}&limit=10`
      superagent.get(movieData).then(cityMovie=>{
      const arrMovieData= cityMovie.body.results.map(element=>new Movie(element))
      res.send(arrMovieData);
      })
    } catch (error) {
      console.log(error)
    }
  }

  class Movie {
    constructor(movies){
      this.movieTitle=movies.title;
      this.movieDescription=movies.overview;
      this.img=movies.poster_path;
    }
  }

  
module.exports =movieCity;