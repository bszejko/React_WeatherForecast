import 'bulma/css/bulma.min.css';
import React from 'react';
import Weather from './components/weather';
import './styling.css'; 
import './App.css';


function App() {
  return (
    <div className="App" >
      <div className="background" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column'}}>
        <h3 className="title is-3">Search the weather!</h3>
        <Weather />
      </div>
    </div>
  );
}



export default App;
