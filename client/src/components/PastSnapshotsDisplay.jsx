import { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import "./pastSnapshotsDisplay.css";

const PastSnapshotsDisplay = (props) => {
  const { pastSnapshots } = props;
  const [displaySnapshots, setDisplaySnapshots] = useState([]);
  useEffect(() => {
    const formattedSnapshots = pastSnapshots.map((snapshot, index) => (
      <Card key={index}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            {snapshot.time}
          </Typography>
          <Typography sx={{ fontSize: 48 }}>{snapshot.weather}</Typography>
          <Typography sx={{ fontSize: 28 }}>
            {Math.round(snapshot.temperature2m)} °C
          </Typography>
        </CardContent>
      </Card>
    ));
    setDisplaySnapshots(formattedSnapshots);
  }, [pastSnapshots]);

  return <div className="snapshotContainer">{displaySnapshots}</div>;
};

export default PastSnapshotsDisplay;
