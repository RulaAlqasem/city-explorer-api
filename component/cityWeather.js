
const weatherData=require('../data/weather.json');
const superagent = require('superagent');
require('dotenv').config()





 const WEATHER_BIT_KEY=process.env.WEATHER_BIT_KEY;

const weather= (req, res)=> {
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
};
class Weather {
  constructor(deata){
    this.date=deata.valid_date;
    this.description=deata.weather.description;
  }
}

module.exports=weather ;