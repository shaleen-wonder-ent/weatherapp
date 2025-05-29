import React, { useState } from 'react'
import { Search, MapPin } from 'lucide-react'
import './SearchBar.css'

const SearchBar = ({ onSearch, onLocationSearch, loading }) => {
  const [query, setQuery] = useState('')
  const [locationLoading, setLocationLoading] = useState(false)
  const [locationError, setLocationError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim() && !loading && !locationLoading) {
      onSearch(query.trim())
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  const handleLocationClick = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser')
      return
    }

    if (loading || locationLoading) return

    setLocationLoading(true)
    setLocationError(null)

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000 // 5 minutes
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLocationLoading(false)
        onLocationSearch(latitude, longitude)
      },
      (error) => {
        setLocationLoading(false)
        let errorMessage = 'Unable to get your location'
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location permissions and try again.'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable. Please try again later.'
            break
          case error.TIMEOUT:
            errorMessage = 'Location request timed out. Please try again.'
            break
          default:
            errorMessage = 'An error occurred while getting your location.'
            break
        }
        
        setLocationError(errorMessage)
        
        // Clear error after 5 seconds
        setTimeout(() => {
          setLocationError(null)
        }, 5000)
      },
      options
    )
  }

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search for a city... (e.g., London, New York, Tokyo)"
            className="search-input"
            disabled={loading || locationLoading}
          />
          <button
            type="button"
            className={`location-button ${locationLoading ? 'loading' : ''}`}
            onClick={handleLocationClick}
            disabled={loading || locationLoading}
            title="Use my current location"
          >
            <MapPin size={16} />
            {locationLoading ? 'Locating...' : 'Use My Location'}
          </button>
          <button
            type="submit"
            className={`search-button ${loading ? 'loading' : ''}`}
            disabled={loading || locationLoading || !query.trim()}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
      
      {locationError && (
        <div className="location-error">
          <p>📍 {locationError}</p>
        </div>
      )}
      
      <div className="quick-cities">
        <p>Quick search:</p>
        <div className="city-buttons">
          {['London', 'New York', 'Tokyo', 'Paris', 'Sydney'].map((city) => (
            <button
              key={city}
              className="city-button"
              onClick={() => onSearch(city)}
              disabled={loading || locationLoading}
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchBar
