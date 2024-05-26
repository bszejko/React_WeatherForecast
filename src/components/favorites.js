// src/components/Favorites.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Favorites = ({ favorites, removeFavorite, fetchFavoriteWeather, addFavorite, isValidCity }) => (
  <div>
    <div className="favorites-header" style={{ display: 'flex', alignItems: 'center', paddingTop: '10px' }}>
      <h2 className="title is-4 deep-gray-text" style={{ marginRight: '10px', marginBottom: 0 }}>Favourites</h2>
      <button className="button is-info" onClick={addFavorite} disabled={!isValidCity} style={{ marginBottom: '0' }}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
    <div className="buttons" style={{ marginTop: '20px' }}>
      {favorites.map((favoriteCity, index) => (
        <div key={index} className="button is-info" style={{ marginBottom: '5px' }}>
          <span onClick={() => fetchFavoriteWeather(favoriteCity)}>{favoriteCity}</span>
          <button className="delete is-small" onClick={() => removeFavorite(favoriteCity)}></button>
        </div>
      ))}
    </div>
  </div>
);

export default Favorites;
