// src/components/Weather.js
import React, { useState } from 'react';
import axios from 'axios';
import iconMap from '../iconMapping';
import WeatherInput from './weatherInput';
import CurrentWeather from './currentWeather';
import WeatherForecast from './weatherForecast';
import Favorites from './favorites';
import WeatherMap from './WeatherMap';
import '../Weather.css';


const Weather = ({ unit }) => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [isValidCity, setIsValidCity] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [coordinates, setCoordinates] = useState([51.505, -0.09]); // Default coordinates

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
      setCoordinates([response.data.location.lat, response.data.location.lon]);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeather(null);
      setIsValidCity(false);
    }
  };

  const getIconPath = (condition, isDay) => {
    const normalizedCondition = condition.toLowerCase().trim();
    const filename = iconMap[normalizedCondition] || 'default.png';
    const folder = isDay ? 'day' : 'night';
    return `/icons/${folder}/${filename}`;
  };

  const convertTemperature = (tempC) => {
    return unit === 'C' ? tempC : (tempC * 9 / 5) + 32;
  };

  const addFavorite = () => {
    if (!favorites.includes(city)) {
      setFavorites([...favorites, city]);
    }
  };

  const removeFavorite = (cityToRemove) => {
    setFavorites(favorites.filter(favCity => favCity !== cityToRemove));
  };

  const fetchFavoriteWeather = async (favoriteCity) => {
    try {
      const apiKey = '841f7ebcf6054841963170701243004';
      const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${favoriteCity}&days=6`);
      setWeather(response.data);
      setCity(favoriteCity);
      setIsValidCity(true);
      setCoordinates([response.data.location.lat, response.data.location.lon]);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeather(null);
      setIsValidCity(false);
    }
  };

  return (
      <div className="weather-container deep-gray-text" >
        <WeatherInput
            city={city}
            isValidCity={isValidCity}
            handleInputChange={handleInputChange}
            fetchWeather={fetchWeather}
        />
        <button className="button is-info" onClick={addFavorite} disabled={!isValidCity}>Add to Favorites</button>
        {weather ? (
            <>
              <CurrentWeather weather={weather} getIconPath={getIconPath} convertTemperature={convertTemperature} unit={unit} />
              <WeatherForecast forecast={weather.forecast} getIconPath={getIconPath} convertTemperature={convertTemperature} unit={unit} />
              <div className="map-padding">
                <WeatherMap city={city} coordinates={coordinates} />
              </div>
            </>
        ) : (
            <p className="notification is-warning">No weather data available. Please search for a city.</p>
        )}
        <Favorites favorites={favorites} removeFavorite={removeFavorite} fetchFavoriteWeather={fetchFavoriteWeather} />
      </div>
  );
};

export default Weather;