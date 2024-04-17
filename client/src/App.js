import "./App.css";
import React, { useState } from "react";
import WeatherDataDisplay from "./components/WeatherDataDisplay";
import AutoRefreshButton from "./components/AutoRefreshButton";
import RefreshTimer from "./components/RefreshTimer";
import SnapshotButton from "./components/SnapshotButton";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshDataTimer, setRefreshDataTimer] = useState(60);
  const [pastSnapshots, setPastSnapshots] = useState([]);

  return (
    <div className="App">
      <WeatherDataDisplay
        weatherData={weatherData}
        setWeatherData={setWeatherData}
        autoRefresh={autoRefresh}
        setRefreshDataTimer={setRefreshDataTimer}
      />
      <RefreshTimer
        refreshDataTimer={refreshDataTimer}
        setRefreshDataTimer={setRefreshDataTimer}
        autoRefresh={autoRefresh}
      />
      <div className="buttons">
        <SnapshotButton weatherData={weatherData} />
        <AutoRefreshButton
          autoRefresh={autoRefresh}
          setAutoRefresh={setAutoRefresh}
          setRefreshDataTimer={setRefreshDataTimer}
        />
      </div>
    </div>
  );
}

export default App;
