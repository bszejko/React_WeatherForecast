// Favorites.js
import React from 'react';

const Favorites = ({ favorites, removeFavorite, fetchFavoriteWeather }) => (
    <div>

        <h2 className="title is-4 deep-gray-text" style={{paddingTop: '10px'}}>Favorites</h2>
        <div className="buttons">
            {favorites.map((favoriteCity, index) => (
                <div key={index} className="button is-info">
                    <span onClick={() => fetchFavoriteWeather(favoriteCity)}>{favoriteCity}</span>
                    <button className="delete is-small" onClick={() => removeFavorite(favoriteCity)}></button>
                </div>
            ))}

        </div>
    </div>
);

export default Favorites;
