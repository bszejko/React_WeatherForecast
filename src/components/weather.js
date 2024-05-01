// Weather.js
import React, { useState } from 'react';
import axios from 'axios';
import iconMap from '../iconMapping';
import WeatherInput from '../components/weatherInput';
import CurrentWeather from '../components/currentWeather';
import WeatherForecast from '../components/weatherForecast';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [isValidCity, setIsValidCity] = useState(false);

  const handleInputChange = (event) => {
    setCity(event.target.value);
    setIsValidCity(false);
    if (!event.target.value) {
      setWeather(null);
    }
  };

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const apiKey = '841f7ebcf6054841963170701243004';
      const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=6`);
      setWeather(response.data);
      setIsValidCity(true);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeather(null);
      setIsValidCity(false);
    }
  };

  const getIconPath = (condition, isDay) => {
    const filename = iconMap[condition] || 'default.png';
    const folder = isDay ? 'day' : 'night';
    return `/icons/${folder}/${filename}`;
  };

  return (
    <div>
      <WeatherInput
        city={city}
        isValidCity={isValidCity}
        handleInputChange={handleInputChange}
        fetchWeather={fetchWeather}
      />
      {weather ? (
        <>
          <CurrentWeather weather={weather} getIconPath={getIconPath} />
          <WeatherForecast forecast={weather.forecast} getIconPath={getIconPath} />
        </>
      ) : (
        <p>No weather data available. Please search for a city.</p>
      )}
    </div>
  );
};

export default Weather;
