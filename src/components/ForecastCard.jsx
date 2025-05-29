import React from 'react'
import './ForecastCard.css'

const ForecastCard = ({ forecastData }) => {
  if (!forecastData) return null

  const {
    dt,
    main: { temp_min, temp_max },
    weather: [{ main: weatherMain, description }]
  } = forecastData

  const tempMinCelsius = Math.round(temp_min - 273.15)
  const tempMaxCelsius = Math.round(temp_max - 273.15)

  // Get day of week from timestamp
  const date = new Date(dt * 1000)
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' })
  const dayOfMonth = date.getDate()

  const getWeatherEmoji = (main) => {
    const emojiMap = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️',
      'Smoke': '🌫️',
      'Haze': '🌫️',
      'Dust': '🌫️',
      'Fog': '🌫️',
      'Sand': '🌫️',
      'Ash': '🌫️',
      'Squall': '💨',
      'Tornado': '🌪️'
    }
    return emojiMap[main] || '🌤️'
  }

  return (
    <div className="forecast-card">
      <div className="forecast-day">
        <span className="day-name">{dayOfWeek}</span>
        <span className="day-number">{dayOfMonth}</span>
      </div>
      
      <div className="forecast-weather">
        <div className="forecast-emoji">{getWeatherEmoji(weatherMain)}</div>
        <span className="forecast-description">{description}</span>
      </div>
      
      <div className="forecast-temps">
        <span className="temp-max">{tempMaxCelsius}°</span>
        <span className="temp-min">{tempMinCelsius}°</span>
      </div>
    </div>
  )
}

export default ForecastCard