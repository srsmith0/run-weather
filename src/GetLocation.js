import axios from 'axios';
import React, { useState } from 'react'

const GetLocation = () => {
  const [ zipcode, setZipcode ] = useState("");
  const [ latitude, setLatitude ] = useState("");
  const [ longitude, setLongitude ] = useState("");
  const [ temperature, setTemperature ] = useState("");
  const [ feelsLike, setFeelsLike ] = useState("");
  const [ wind, setWind ] = useState("");
  const [ weatherDescription, setWeatherDescription ] = useState("");
  const [ aqi, setAqi ] = useState("");

  const myKey = process.env.REACT_APP_WEATHER_KEY

  //FIXME: lat and lon won't load properly on first load of page, uses empty string until set

  const setWeatherValues = data => {
    setTemperature(data.main.temp)
    setFeelsLike(data.main.feels_like);
    setWind(data.wind.speed);
    setWeatherDescription(data.weather[0].description);
  }

  const getAirQuality = (lat, lon) => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${myKey}`)
    .then(res => {
      setAqi(res.data.list[0].main.aqi)
    }).catch(err => console.log(err))
  }

  const getUserLocation = () => {
    const status = document.querySelector('#status');
  
    const success = position => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      status.textContent = '';
    }
  
    const error = () => {
      status.textContent = 'Unable to retrieve your location';
    }
  
    if(!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
      status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${myKey}`)
      .then(res => {
        setWeatherValues(res.data)
    }).catch(e => console.log(e))
    getAirQuality(latitude, longitude);
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
    //TODO: use button to get location. set component as !location, and display weather if it is a float
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
    </>
  )
}

export default GetLocation;