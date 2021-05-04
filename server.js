const express = require('express');
const weatherData=require('./data/weather.json');
const app = express();
const cors = require('cors');
require('dotenv').config()
const PORT=process.env.PORT;
app.use(cors());
app.get('/', function (req, res) {
  const arrData= weatherData.data.map(element=>new Weather(element))
  res.send(arrData);
});

class Weather {
  constructor(data){
    this.date=data.valid_date;
    this.description=data.weather.description;
  }
}

app.listen(PORT);