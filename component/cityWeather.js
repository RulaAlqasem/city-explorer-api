
const weatherData=require('../data/weather.json');
const superagent = require('superagent');
require('dotenv').config()

const inMemory={};


 const WEATHER_BIT_KEY=process.env.WEATHER_BIT_KEY;

const weather= (req, res)=> {
  const weatherData=`https://api.weatherbit.io/v2.0/forecast/daily`
  const queryPrams={
   key:WEATHER_BIT_KEY,
   lat:req.query.lat ,
   lon:req.query.lon
  }
  if (inMemory[`${req.query.lat}${req.query.lon}`]) {

    console.log('cache hit')
    res.send(inMemory[`${req.query.lat}${req.query.lon}`])
    
  } else {
    console.log('cache miss')
    try {

      console.log(req.query);
      superagent.get(weatherData).query(queryPrams).then(cityWeather=>{
      const arrData= cityWeather.body.data.map(element=>new Weather(element))
      inMemory[`${req.query.lat}${req.query.lon}`]=arrData
      res.send(arrData);
      })
    } catch (error) {
        const arrData= weatherData.data.map(element=>new Weather(element))
        res.send(arrData)
    }
  }
  
};
class Weather {
  constructor(deata){
    this.date=deata.valid_date;
    this.description=deata.weather.description;
  }
}

module.exports=weather ;