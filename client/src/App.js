import "./App.css";
import React, { useState, useCallback, useRef } from "react";
import WeatherDataDisplay from "./components/WeatherDataDisplay";
import AutoRefreshButton from "./components/AutoRefreshButton";
import RefreshTimer from "./components/RefreshTimer";
import SnapshotButton from "./components/SnapshotButton";
import PastSnapshotsButton from "./components/PastSnapshotsButton";
import PastSnapshotsDisplay from "./components/PastSnapshotsDisplay";
import { Modal, Snackbar, Alert } from "@mui/material";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshDataTimer, setRefreshDataTimer] = useState(60);
  const [pastSnapshots, setPastSnapshots] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);
  const style = {
    position: "absolute",
    top: "40%",
  };
  const intervalRef = useRef();

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const handleCloseSnackBar = useCallback(() => {
    clearInterval(intervalRef.current);
    setOpenSnackBar(false);
    intervalRef.current = setInterval(() => {
      setAlertMessage(null);
      setAlertType(null);
    }, 3000);
  }, []);

  const createAlert = useCallback((message, alertTyping = null) => {
    setAlertMessage(message);
    setAlertType(alertTyping);
    setOpenSnackBar(true);
  }, []);

  return (
    <div className="App">
      <WeatherDataDisplay
        weatherData={weatherData}
        setWeatherData={setWeatherData}
        autoRefresh={autoRefresh}
        setRefreshDataTimer={setRefreshDataTimer}
        createAlert={createAlert}
      />
      <RefreshTimer
        refreshDataTimer={refreshDataTimer}
        setRefreshDataTimer={setRefreshDataTimer}
        autoRefresh={autoRefresh}
      />
      <div className="buttons">
        <SnapshotButton weatherData={weatherData} createAlert={createAlert} />
        <AutoRefreshButton
          autoRefresh={autoRefresh}
          setAutoRefresh={setAutoRefresh}
          setRefreshDataTimer={setRefreshDataTimer}
        />
        <PastSnapshotsButton
          setPastSnapshots={setPastSnapshots}
          setOpenModal={setOpenModal}
          createAlert={createAlert}
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
      <Snackbar
        autoHideDuration={1000}
        open={openSnackBar}
        onClose={handleCloseSnackBar}
      >
        <Alert variant="filled" severity={alertType ?? "info"}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
