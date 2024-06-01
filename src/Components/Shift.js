import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import useTimer from "../Hooks/useTimer";
import {
  GetFromLocalStorage,
  GetFromSessionStorage,
  SaveToLocalStorage,
  SaveToSessionStorage,
} from "../Utils/utilities";
import { Typography } from "@mui/material";
import { useAlert } from "../Hooks/useAlert";
import { useTranslation } from "react-i18next";

//the component button for starting and ending a shift
export default function ShiftButton({ disabled }) {
  const { t } = useTranslation();
  const { setAlert } = useAlert();
  const { addTimer, getTimerValue, stopTheTimer } = useTimer();

  const [loading, setLoading] = useState(false);
  const [shift, setShift] = useState(GetFromSessionStorage("shift"));

  const timer = getTimerValue("shiftTimer");

  //handles if the shift will be started or be finished
  const handleClick = () => {
    setLoading(true);
    let shiftTemp = { ...shift };
    if (shift.started) stopTheTimer("shiftTimer");
    setTimeout(() => {
      if (!shift.started) {
        shiftTemp.startTime = new Date().toLocaleString();
        shiftTemp.started = true;
        setShift(shiftTemp);
        addTimer("shiftTimer");
        setAlert({ text: t("shiftStarted"), type: "success", duration: 1000 });
      } else {
        shiftTemp.started = false;
        shiftTemp.endTime = new Date().toLocaleString();
        shiftTemp.duration = timer;
        SaveToLocalStorage("shifts", [
          ...GetFromLocalStorage("shifts"),
          { ...shiftTemp },
        ]);
        setShift(shiftTemp);
        setAlert({
          text: t("shiftEnded") + " " + new Date().toLocaleString(),
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
        t("startTheShift")
      ) : (
        <Typography fontWeight={"bold"}>
          {timer.hours + ":" + timer.minutes + ":" + timer.seconds}
        </Typography>
      )}
    </LoadingButton>
  );
}
