import { useEffect } from "react";
import { Typography } from "@mui/material";

const RefreshTimer = (props) => {
  const { refreshDataTimer, setRefreshDataTimer, autoRefresh } = props;

  useEffect(() => {
    if (!autoRefresh) return;
    const intervalId = setInterval(() => {
      const newTime = refreshDataTimer === 0 ? 0 : refreshDataTimer - 1;
      setRefreshDataTimer(newTime);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [refreshDataTimer, setRefreshDataTimer, autoRefresh]);

  return (
    <Typography sx={{ fontSize: 35 }}>
      Data Refresh Timer: {autoRefresh === true ? refreshDataTimer : "Paused"}
    </Typography>
  );
};

export default RefreshTimer;
