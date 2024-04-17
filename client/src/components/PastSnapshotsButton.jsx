import { useCallback } from "react";
import { Button } from "@mui/material";

const PastSnapshotsButton = (props) => {
  const { setPastSnapshots } = props;

  const fetchSnapshots = useCallback(async () => {
    try {
      const response = await fetch("/api/pastsnapshots").then((res) =>
        res.json()
      );
      if (!response?.pastFiveSnapshots) {
        throw new Error("Network response was not okay");
      }
      setPastSnapshots(response?.pastFiveSnapshots);
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
    }
  }, [setPastSnapshots]);

  return (
    <Button variant="outlined" onClick={() => fetchSnapshots()}>
      Past Snapshots
    </Button>
  );
};

export default PastSnapshotsButton;
