import './App.css';
import React, { useState } from 'react';
import WeatherDataDisplay from './components/WeatherDataDisplay';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const[autoRefresh, setAutoRefresh] = useState(true);

  return (
    <div className="App">
        <WeatherDataDisplay weatherData={weatherData} setWeatherData={setWeatherData} autoRefresh={autoRefresh}/>
    </div>
  );
}

export default App;
