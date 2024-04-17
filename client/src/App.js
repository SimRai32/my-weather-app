import "./App.css";
import React, { useState, useCallback } from "react";
import WeatherDataDisplay from "./components/WeatherDataDisplay";
import AutoRefreshButton from "./components/AutoRefreshButton";
import RefreshTimer from "./components/RefreshTimer";
import SnapshotButton from "./components/SnapshotButton";
import PastSnapshotsButton from "./components/PastSnapshotsButton";
import PastSnapshotsDisplay from "./components/PastSnapshotsDisplay";
import { Modal } from "@mui/material";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshDataTimer, setRefreshDataTimer] = useState(60);
  const [pastSnapshots, setPastSnapshots] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const style = {
    position: "absolute",
    top: "40%",
  };

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

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
        <PastSnapshotsButton
          setPastSnapshots={setPastSnapshots}
          setOpenModal={setOpenModal}
        />
      </div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={style}
      >
        <div>
          <PastSnapshotsDisplay pastSnapshots={pastSnapshots} />
        </div>
      </Modal>
    </div>
  );
}

export default App;
