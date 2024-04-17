import './App.css';
import React, { useState } from 'react';
import WeatherDataDisplay from './components/WeatherDataDisplay';
import AutoRefreshButton from './components/AutoRefreshButton';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const[autoRefresh, setAutoRefresh] = useState(true);

  return (
    <div className="App">
        <
          WeatherDataDisplay 
          weatherData={weatherData} 
          setWeatherData={setWeatherData} 
          autoRefresh={autoRefresh}
        />
        <div className="buttons">
          <AutoRefreshButton autoRefresh={autoRefresh} setAutoRefresh={setAutoRefresh}/>
        </div>
    </div>
  );
}

export default App;
