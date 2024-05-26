import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for the default icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapUpdater = ({ coordinates }) => {
    const map = useMap();
    React.useEffect(() => {
        map.setView(coordinates, 13);
    }, [coordinates, map]);
    return null;
};

const WeatherMap = ({ city, coordinates }) => {
    return (
        <div style={{ height: "200px", width: "100%" }}> {/* Set a fixed height here */}
            <MapContainer center={coordinates} zoom={13} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={coordinates}>
                    <Popup>
                        Weather information for {city}
                    </Popup>
                </Marker>
                <MapUpdater coordinates={coordinates} />
            </MapContainer>
        </div>
    );
};

export default WeatherMap;
