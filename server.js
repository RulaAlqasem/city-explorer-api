const express = require('express');
const weatherData=require('./data/weather.json');
const superagent = require('superagent');
const app = express();
const cors = require('cors');
require('dotenv').config()
const PORT=process.env.PORT;
app.use(cors());
 const WEATHER_BIT_KEY=process.env.WEATHER_BIT_KEY;
 const MOVIE_BIT_KEY=process.env.MOVIE_BIT_KEY;
app.get('/weather', function (req, res) {
  try {
    console.log(req.query);
    const weatherData=`https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`
    superagent.get(weatherData).then(cityWeather=>{
    const arrData= cityWeather.body.data.map(element=>new Weather(element))
    res.send(arrData);
    })
  } catch (error) {
      const arrData= weatherData.data.map(element=>new Weather(element))
      res.send(arrData)
  }
});
class Weather {
  constructor(deata){
    this.date=deata.valid_date;
    this.description=deata.weather.description;
  }
}


app.get('/movie', function (req, res) {
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
});
class Movie {
  constructor(movies){
    this.movieTitle=movies.title;
    this.movieDescription=movies.overview;
    this.img=movies.poster_path;
  }
}



app.listen(PORT);