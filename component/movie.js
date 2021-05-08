
const superagent = require('superagent');
require('dotenv').config()

const MOVIE_BIT_KEY=process.env.MOVIE_BIT_KEY;
const inMemory={};

let movieCity= (req, res) =>{
  const movieData=`https://api.themoviedb.org/3/search/movie`
      const queryPrams ={
        api_key:MOVIE_BIT_KEY,
        query:req.query.query
      }

  if (inMemory[req.query.query]) {
    
    console.log('cache hit')
    res.send(inMemory[req.query.query])
    
    
  } else {
    console.log('cache miss')
    try {
      
     
    
      superagent.get(movieData).query(queryPrams).then(cityMovie=>{
      const arrMovieData= cityMovie.body.results.map(element=>new Movie(element))
      inMemory[req.query.query]=arrMovieData
      res.send(arrMovieData);
      })
    } catch (error) {
      console.log(error)
    }
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