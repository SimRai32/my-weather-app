import { useCallback, useState } from "react";
import { Button } from "@mui/material";

const PastSnapshotsButton = (props) => {
  const { setPastSnapshots } = props;
  const [loading, setLoading] = useState(false);

  const fetchSnapshots = useCallback(async () => {
    if (loading) return;
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }, [loading, setPastSnapshots]);

  return (
    <Button variant="outlined" onClick={() => fetchSnapshots()}>
      Past Snapshots
    </Button>
  );
};

export default PastSnapshotsButton;
