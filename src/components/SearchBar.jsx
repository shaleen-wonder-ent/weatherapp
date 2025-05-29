import React, { useState } from 'react'
import { Search, MapPin } from 'lucide-react'
import './SearchBar.css'

const SearchBar = ({ onSearch, onLocationSearch, loading, locationLoading }) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim() && !loading) {
      onSearch(query.trim())
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  const handleLocationDetection = () => {
    if (!locationLoading && onLocationSearch) {
      onLocationSearch()
    }
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
            className="search-input"            disabled={loading}
          />
          <button
            type="button"
            className={`location-button ${locationLoading ? 'loading' : ''}`}
            onClick={handleLocationDetection}
            disabled={loading || locationLoading}
            title="Use my current location"
          >
            <MapPin size={16} />
            {locationLoading ? 'Detecting...' : 'My Location'}
          </button>
          <button
            type="submit"
            className={`search-button ${loading ? 'loading' : ''}`}
            disabled={loading || !query.trim()}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
      
      <div className="quick-cities">
        <p>Quick search:</p>
        <div className="city-buttons">
          {['London', 'New York', 'Tokyo', 'Paris', 'Sydney'].map((city) => (
            <button
              key={city}
              className="city-button"
              onClick={() => onSearch(city)}
              disabled={loading}
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
