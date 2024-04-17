import { useCallback, useState } from "react";
import { Button } from "@mui/material";

const PastSnapshotsButton = (props) => {
  const { setPastSnapshots, setOpenModal } = props;
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
      const snapshotsArray = response?.pastFiveSnapshots;
      setPastSnapshots(snapshotsArray);
      if (snapshotsArray.length) setOpenModal(true);
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  return (
    <Button variant="outlined" onClick={() => fetchSnapshots()}>
      Past Snapshots
    </Button>
  );
};

export default PastSnapshotsButton;
