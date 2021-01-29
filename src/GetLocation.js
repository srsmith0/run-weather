import axios from 'axios';
import React, { useState } from 'react'
import WeatherDisplay from './WeatherDisplay';

const GetLocation = () => {
  const [ zipcode, setZipcode ] = useState("");
  const [ temperature, setTemperature ] = useState("");
  const [ feelsLike, setFeelsLike ] = useState("");
  const [ wind, setWind ] = useState("");
  const [ weatherDescription, setWeatherDescription ] = useState("");
  const [ aqi, setAqi ] = useState("");
  const [ showWeather, setShowWeather ] = useState(false);

  const myKey = process.env.REACT_APP_WEATHER_KEY

  const getWeather = (latitude, longitude) => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${myKey}`)
    .then(res => {
      setWeatherValues(res.data)
  }).catch(e => console.log("you messed up on getting the weather son!"))
  }

  const setWeatherValues = data => {
    setTemperature(data.main.temp)
    setFeelsLike(data.main.feels_like);
    setWind(data.wind.speed);
    setWeatherDescription(data.weather[0].description);
    setShowWeather(true);
  }

  const getAirQuality = (latitude, longitude) => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${myKey}`)
    .then(res => {
      setAqi(res.data.list[0].main.aqi)
    }).catch(err => console.log(err))
  }

  const getUserLocation = () => {
    const status = document.querySelector('#status');
  
    const success = position => {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude
      getWeather(latitude, longitude);
      getAirQuality(latitude, longitude);
      status.textContent = '';
    }
  
    const error = () => {
      status.textContent = 'Unable to retrieve your location. Please use zipcode';
    }
  
    if(!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
      status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error)
    }
  }

  //TODO: Get coordinates from zipcode to use for AQI
  const useZipcode = (e) => {
    e.preventDefault();
    axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&units=imperial&appid=${myKey}`)
    .then(res => {
      setWeatherValues(res.data)
    })
    setZipcode("")
  }

  return (
    <>
    <button onClick={getUserLocation}>
      Use My Location
    </button>
    <p id="status"></p>
    <p>OR</p>
    <form onSubmit={useZipcode}>
      <label htmlFor='zipcode'>Zipcode</label>
      <input name='zipcode' value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
      <button>Submit</button>
    </form>
    <WeatherDisplay
      temperature={temperature}
      feelsLike={feelsLike}
      wind={wind}
      weatherDescription={weatherDescription}
      aqi={aqi} 
      showWeather={showWeather} /> 
    </>
  )
}

export default GetLocation;