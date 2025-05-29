import React, { useState, useEffect } from 'react'
import WeatherCard from './components/WeatherCard'
import SearchBar from './components/SearchBar'
import WeatherService from './services/WeatherService'
import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [locationLoading, setLocationLoading] = useState(false)
  const [error, setError] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [forecast, setForecast] = useState([])
  const [forecastLoading, setForecastLoading] = useState(false)
  const [forecastError, setForecastError] = useState(null)

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('weatherAppFavorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('weatherAppFavorites', JSON.stringify(favorites))
  }, [favorites])

  const handleSearch = async (city) => {
    if (!city.trim()) return

    setLoading(true)
    setError(null)
    setForecast([])
    setForecastError(null)
    setForecastLoading(true)

    try {
      const data = await WeatherService.getWeatherByCity(city)
      setWeatherData(data)

      try {
        const forecastData = await WeatherService.get5DayForecastByCity(city)
        setForecast(forecastData)
      } catch (ferr) {
        setForecastError('Failed to load forecast')
        setForecast([])
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data')
      setWeatherData(null)
      setForecast([])
    } finally {
      setLoading(false)
      setForecastLoading(false)
    }
  }

  const handleLocationSearch = async () => {
    setLocationLoading(true)
    setError(null)
    setForecast([])
    setForecastError(null)
    setForecastLoading(true)

    try {
      const data = await WeatherService.getCurrentLocationWeather()
      setWeatherData(data)

      try {
        const forecastData = await WeatherService.get5DayForecastByCity(data.name)
        setForecast(forecastData)
      } catch (ferr) {
        setForecastError('Failed to load forecast')
        setForecast([])
      }
    } catch (err) {
      setError(err.message || 'Failed to detect your location')
      setWeatherData(null)
      setForecast([])
    } finally {
      setLocationLoading(false)
      setForecastLoading(false)
    }
  }

  const addToFavorites = (city) => {
    if (!favorites.includes(city)) {
      setFavorites([...favorites, city])
    }
  }

  const removeFromFavorites = (city) => {
    setFavorites(favorites.filter(fav => fav !== city))
  }

  const handleFavoriteClick = (city) => {
    handleSearch(city)
  }

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1 className="app-title">
            <span className="weather-icon">🌤️</span>
            Weather App
          </h1>
          <p className="app-subtitle">Get current weather information for any city</p>
        </header>        <SearchBar 
          onSearch={handleSearch}
          onLocationSearch={handleLocationSearch}
          loading={loading}
          locationLoading={locationLoading}
        />

        {favorites.length > 0 && (
          <div className="favorites-section">
            <h3>Favorite Cities</h3>
            <div className="favorites-list">
              {favorites.map((city, index) => (
                <button
                  key={index}
                  className="favorite-item"
                  onClick={() => handleFavoriteClick(city)}
                >
                  {city}
                  <button
                    className="remove-favorite"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFromFavorites(city)
                    }}
                  >
                    ×
                  </button>
                </button>
              ))}
            </div>
          </div>
        )}

        <main className="main-content">
          {loading && (
            <div className="loading">
              <div className="loading-spinner"></div>
              <p>Loading weather data...</p>
            </div>
          )}

          {error && (
            <div className="error">
              <p>❌ {error}</p>
            </div>
          )}

          {weatherData && !loading && (
            <WeatherCard 
              weatherData={weatherData}
              onAddToFavorites={addToFavorites}
              isFavorite={favorites.includes(weatherData.name)}
              forecast={forecast}
              forecastLoading={forecastLoading}
              forecastError={forecastError}
            />
          )}

          {!weatherData && !loading && !error && (
            <div className="welcome">
              <div className="welcome-icon">🌍</div>
              <h2>Welcome to Weather App</h2>
              <p>Search for a city to see current weather conditions</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
