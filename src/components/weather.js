import React, { useState } from 'react';
import axios from 'axios';
import iconMap from '../iconMapping';

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
            const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`);
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

            {weather && (
                <div>
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

                    <h2>Forecast</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', justifyContent: 'center' }}>

                    {weather.forecast.forecastday.map((day, index) => (
    <div key={index} className="card" style={{ width: '150px', height: '180px' }}>
        <div className="card-content">
            <h3 style={{fontWeight: 'bold'}}>{day.date}</h3>
            <div style={{ display: 'flex', justifyContent: 'center',marginTop:'10px' }}>
                <img
                    src={getIconPath(day.day.condition.text, true)}
                    alt={day.day.condition.text}
                    style={{ width: '50px', height: '50px' }}
                />
            </div>
            <p>Max: {day.day.maxtemp_c}°C</p>
            <p>Min: {day.day.mintemp_c}°C</p>
        </div>
    </div>
))}

                    </div>
                </div>
            )}

            {!weather && <p>No weather data available. Please search for a city.</p>}
        </div>
    );
};

export default Weather;
