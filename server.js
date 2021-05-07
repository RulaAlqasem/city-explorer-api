
  
const express = require('express');
const cors = require('cors');
const weather = require('./component/cityWeather');
const movie = require('./component/movie');

require('dotenv').config();

const app = express()
const PORT=process.env.PORT;


app.use(cors());


app.get('/weather', weather);



app.get('/movie',movie );





app.listen(PORT);