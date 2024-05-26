// WeatherForecast.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

SwiperCore.use([Pagination, Navigation]);

const WeatherForecast = ({ forecast, getIconPath, convertTemperature, unit }) => (
    <div>
        <h2 style={{ marginBottom: '20px' }}>Forecast</h2>
        <Swiper slidesPerView={3} spaceBetween={20} loop={true} navigation={true} className="mySwiper">
            {forecast.forecastday.map((day, index) => (
                <SwiperSlide key={index}>
                    <div style={{ textAlign: 'center' }}>
                        <h3 style={{ fontWeight: 'bold' }}>{day.date}</h3>
                        <img
                            src={getIconPath(day.day.condition.text, true)}
                            alt={day.day.condition.text}
                            style={{ width: '50px', height: '50px' }}
                        />
                        <p>Max: {convertTemperature(day.day.maxtemp_c)}°{unit}</p>
                        <p>Min: {convertTemperature(day.day.mintemp_c)}°{unit}</p>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
);

export default WeatherForecast;