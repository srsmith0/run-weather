import React from 'react'

const WeatherDisplay = ({showWeather, temperature, feelsLike, wind, weatherDescription, aqi }) => {

  if (!showWeather) return null
  return (
    <>
      <p>{weatherDescription}</p>
      <p>It is {temperature}°F, but feels like {feelsLike}°F</p>
      <p>{wind} mph is the wind speed</p>
      <p>{aqi} is the current AQI</p>
    </>
  )
}

export default WeatherDisplay;