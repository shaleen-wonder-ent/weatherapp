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
