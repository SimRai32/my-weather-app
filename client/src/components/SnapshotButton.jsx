import { useCallback } from "react";
import { Button } from "@mui/material";

const SnapshotButton = (props) => {
  const { weatherData } = props;

  const snapShot = useCallback(async () => {
    try {
      const response = await fetch("/snapshot", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...weatherData,
        }),
      });
      console.log(response);
      if (!response.ok) {
        new Error("Error creating snapshot");
      }
    } catch (error) {
      console.error(error);
    }
  }, [weatherData]);

  return (
    <Button variant="outlined" onClick={() => snapShot()}>
      Take Snapshot
    </Button>
  );
};

export default SnapshotButton;
