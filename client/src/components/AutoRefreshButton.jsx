import { useCallback, useState } from "react";
import { Button } from "@mui/material";

const AutoRefreshButton = (props) => {
  const { autoRefresh, setAutoRefresh, setRefreshDataTimer } = props;
  const [buttonText, setButtonText] = useState("Off");

  const changeAutoRefresh = useCallback(() => {
    setAutoRefresh(!autoRefresh);
    setRefreshDataTimer(60);
    const changeText = buttonText === "Off" ? "On" : "Off";
    setButtonText(changeText);
  }, [setAutoRefresh, autoRefresh, setRefreshDataTimer, buttonText]);

  return (
    <Button
      variant="outlined"
      color={autoRefresh ? "error" : "success"}
      onClick={() => changeAutoRefresh()}
    >
      Turn Refresh {buttonText}
    </Button>
  );
};

export default AutoRefreshButton;
