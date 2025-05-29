import React from 'react';
import './ForecastCard.css';

const ForecastCard = ({ day, icon, description, tempMin, tempMax }) => {
  return (
    <div className="forecast-card" aria-label={`Forecast for ${day}`} tabIndex={0}>
      <div className="forecast-day">{day}</div>
      <img
        className="forecast-icon"
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
        width={48}
        height={48}
      />
      <div className="forecast-temps">
        <span className="temp-max">{Math.round(tempMax)}°</span>
        <span className="temp-min">{Math.round(tempMin)}°</span>
      </div>
      <div className="forecast-desc">{description}</div>
    </div>
  );
};

export default ForecastCard;
