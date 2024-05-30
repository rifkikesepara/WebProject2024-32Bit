import { LoadingButton } from "@mui/lab";
import { useRef, useState } from "react";
import useTimer from "../Hooks/useTimer";
import {
  GetFromSessionStorage,
  SaveToSessionStorage,
} from "../Utils/utilities";
import { Typography } from "@mui/material";
import { useAlert } from "../Hooks/useAlert";

export default function ShiftButton({ disabled }) {
  const { setAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [shift, setShift] = useState(GetFromSessionStorage("shift"));

  const { addTimer, getTimerValue, stopTheTimer } = useTimer();
  const timer = getTimerValue("shiftTimer");

  const handleClick = () => {
    setLoading(true);
    let shiftTemp = { ...shift };
    if (shift.started) stopTheTimer("shiftTimer");
    setTimeout(() => {
      if (!shift.started) {
        shiftTemp.startTime = new Date();
        shiftTemp.started = true;
        setShift(shiftTemp);
        addTimer("shiftTimer");
        setAlert({ text: "Mesai Başlatıldı", type: "success", duration: 1000 });
      } else {
        shiftTemp.started = false;
        shiftTemp.endTime = new Date();
        shiftTemp.duration = timer;
        setShift(shiftTemp);
        setAlert({
          text: "Mesai Bitirildi " + new Date().toLocaleString("tr-TR"),
          type: "error",
        });
      }
      SaveToSessionStorage("shift", shiftTemp);
      setLoading(false);
    }, 1000);
  };

  return (
    <LoadingButton
      disabled={disabled}
      disableElevation
      color={shift.started ? "secondary" : "primary"}
      variant={!shift.started ? "outlined" : "contained"}
      loading={loading}
      onClick={handleClick}
      sx={{ minWidth: 180 }}
    >
      {!shift.started ? (
        "Start The Shift"
      ) : (
        <Typography fontWeight={"bold"}>
          {timer.hours + ":" + timer.minutes + ":" + timer.seconds}
        </Typography>
      )}
    </LoadingButton>
  );
}
