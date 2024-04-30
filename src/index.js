import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  
import 'bulma/css/bulma.min.css';
import './styling.css'; // Adjust the path as necessary

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);