
import React from 'react'
import ForecastCard from './ForecastCard'
import './ForecastSection.css'

const ForecastSection = ({ forecastData, loading, error }) => {
  if (loading) {
    return (
      <div className="forecast-section">
        <h3 className="forecast-title">5-Day Forecast</h3>
        <div className="forecast-loading">
          <div className="forecast-loading-spinner"></div>
          <p>Loading forecast...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="forecast-section">
        <h3 className="forecast-title">5-Day Forecast</h3>
        <div className="forecast-error">
          <p>⚠️ {error}</p>
        </div>
      </div>
    )
  }

  if (!forecastData || !forecastData.list || forecastData.list.length === 0) {
    return null
  }

  return (
    <div className="forecast-section">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-container">
        {forecastData.list.map((dayForecast, index) => (
          <ForecastCard 
            key={index}
            forecastData={dayForecast}
          />
        ))}
      </div>
    </div>
  )
}

export default ForecastSection
=======
import React from 'react';
import ForecastCard from './ForecastCard';
import './ForecastCard.css';

const ForecastSection = ({ forecast }) => {
  if (!forecast || forecast.length === 0) return null;

  return (
    <section className="forecast-section" aria-label="5-day forecast">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-scroll" tabIndex={0}>
        {forecast.map((day, idx) => (
          <ForecastCard
            key={day.day}
            day={day.day}
            icon={day.icon}
            description={day.description}
            tempMin={day.tempMin}
            tempMax={day.tempMax}
          />
        ))}
      </div>
    </section>
  );
};

export default ForecastSection;

