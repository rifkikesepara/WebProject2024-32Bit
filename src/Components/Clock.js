import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

//clock component that shows the current time
export default function Clock({ sx }) {
  const [date, setDate] = useState(new Date());
  // const [time, setTime] = useState(new Date().toLocaleTimeString("tr-TR"));

  const updateTime = () => {
    setDate(new Date());
  };
  const clock = date.toLocaleTimeString("tr-TR");

  useEffect(() => {
    const intervalID = setInterval(updateTime, 1000);

    return () => clearInterval(intervalID);
  }, [date]);

  return (
    <Typography sx={{ ...sx }}>
      {clock.split(":")[0]}:{clock.split(":")[1]}
    </Typography>
  );
}
