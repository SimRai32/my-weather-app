import { useCallback, useState } from "react";
import { Button } from "@mui/material";

const SnapshotButton = (props) => {
  const { weatherData, createAlert } = props;
  const [loading, setLoading] = useState(false);

  const snapShot = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch("/snapshot", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...weatherData,
        }),
      });
      if (!response.ok) {
        const message = "Network response was not okay";
        createAlert(message, "error");
      } else {
        const message = "Saved Snapshot!";
        createAlert(message, "success");
      }
    } catch (error) {
      const message = `Error saving snapshot: ${error}`;
      createAlert(message, "error");
    } finally {
      setLoading(false);
    }
  }, [loading, weatherData]);

  return (
    <Button variant="outlined" onClick={() => snapShot()}>
      Take Snapshot
    </Button>
  );
};

export default SnapshotButton;
