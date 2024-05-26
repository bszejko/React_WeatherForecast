import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import 'leaflet/dist/leaflet.css';
import Weather from './components/weather';
import './styling.css';
import './App.css';
import './Weather.css';
import sunImage from './components/sun.png'; // Adjust the path as necessary

function App() {
    const [clickCount, setClickCount] = useState(0);
    const [sunSize, setSunSize] = useState(50); // Initial size of the sun image

    const handleSunClick = () => {
        if (clickCount < 6) {
            // Increase the size of the sun image until the 5th click
            setSunSize(prevSize => prevSize * 1.5);
        } else {
            // Return the sun size to its initial size on the 6th click
            setSunSize(50);
            // Reset the click count
            setClickCount(0);
        }
        // Increment the click count
        setClickCount(prevCount => prevCount + 1);
    };

    return (
        <div className="App">
            <div className="background deep-gray-text" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', paddingTop: '190px' }}>
                <div style={{ position: 'absolute', left: '10px', top: '10px' }}>
                    <img
                        src={sunImage}
                        alt="Sun"
                        style={{ width: `${sunSize}px`, height: `${sunSize}px`, cursor: 'pointer' }}
                        onClick={handleSunClick}
                    />
                </div>
                <h3 className="title is-3 deep-gray-text">Search the weather!</h3>
                <Weather />
            </div>
        </div>
    );
}

export default App;
