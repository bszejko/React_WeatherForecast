// WeatherInput.js
import React from 'react';

const WeatherInput = ({ city, isValidCity, handleInputChange, fetchWeather }) => (
    <div className="field has-addons">
        <div className="control is-expanded has-icons-left has-icons-right">
            <input
                className={`input ${isValidCity ? 'is-success' : ''}`}
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={handleInputChange}
            />
            <span className="icon is-small is-left">
        <i className="fas fa-city"></i>
      </span>
            {isValidCity && (
                <span className="icon is-small is-right">
          <i className="fas fa-check"></i>
        </span>
            )}
        </div>
        <div className="control">
            <button className="button" onClick={fetchWeather}>
        <span className="icon is-small">
          <i className="fas fa-search"></i>
        </span>
            </button>
        </div>
    </div>
);

export default WeatherInput;