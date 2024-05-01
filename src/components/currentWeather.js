import React from 'react';

const CurrentWeather = ({ weather, getIconPath }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ marginRight: '20px' }}>
      <img
        style={{ width: '100px', height: 'auto' }}
        src={getIconPath(weather.current.condition.text, weather.current.is_day)}
        alt="Weather Icon"
      />
    </div>
    <div style={{ display: 'flex' }}>
      <div style={{ marginRight: '20px' }}>
        <p style={{ margin: '0', fontWeight: 'bold' }}>{weather.current.temp_c}°C</p>
        <p style={{ margin: '0', fontWeight: 'bold' }}>{weather.current.condition.text}</p>
      </div>
      <div>
        <p style={{ margin: '0'}}>Humidity: {weather.current.humidity}%</p>
        <p style={{ margin: '0'}}>Wind Speed: {weather.current.wind_kph} km/h</p>
      </div>
    </div>
  </div>
);

export default CurrentWeather;
