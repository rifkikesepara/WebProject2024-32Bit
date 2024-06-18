import { createContext, useEffect, useState } from "react";
import {
  GetFromSessionStorage,
  SaveToSessionStorage,
} from "../Utils/utilities";

export const TimerContext = createContext({
  timers: [],
  addTimer: (name = "") => {},
  getTimerValue: (name) => ({ hours: 0, minutes: 0, seconds: 0 }),
  stopTheTimer: (name) => {},
  isStopped: (name) => {
    return false;
  },
});

export default function TimerProvider({ children }) {
  const [timers, setTimers] = useState(GetFromSessionStorage("timers"));

  //adding a new timer that has been indicated by a name
  const addTimer = (name) => {
    const timerExists = timers.find(({ timerName }) => timerName == name);
    console.log("Adding Timer: " + name + " - TimerProvider");
    const temp = [...timers];
    if (timerExists) {
      temp.splice(timers.indexOf(timerExists), 1);
    }
    setTimers([...temp, { timerName: name, time: 0, stopped: false }]);
  };

  //getting the value object of the timer that has been requested by the timer name
  const getTimerValue = (name) => {
    const timerValue = timers.find(({ timerName }) => timerName == name)?.time;
    // console.log("timerValue: " + timerValue.time);
    const min = Math.floor(timerValue / 60);
    const hour = Math.floor(min / 60);
    const sec = timerValue % 60;

    return {
      hours: hour.toLocaleString("tr-TR", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }),
      minutes: min.toLocaleString("tr-TR", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }),
      seconds: sec.toLocaleString("tr-TR", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }),
    };
  };

  //stops the timer that has been indicated by its name
  const stopTheTimer = (name) => {
    const timer = timers.find(({ timerName }) => timerName == name);
    const index = timers.indexOf(timer);
    const temp = [...timers];
    temp[index].stopped = true;
    setTimers(temp);
  };

  const isStopped = (name) => {
    const timer = timers.find(({ timerName }) => timerName == name);
    if (timer) {
      if (timer.stopped) return true;
      else return false;
    }
  };

  //incrementing the time of the timers that has been intialized
  useEffect(() => {
    const interval = setInterval(() => {
      const temp = [...timers];
      timers.map((timer, index) => {
        if (!timer.stopped) temp[index].time = timer.time + 1;
      });
      setTimers(temp);
    }, 1000);

    SaveToSessionStorage("timers", timers);
    return () => clearInterval(interval);
  }, [timers]);

  //the hook for to keep continue the timers that has been intialized even though the page reloads
  useEffect(() => {
    if (GetFromSessionStorage("timers").length)
      setTimers(GetFromSessionStorage("timers"));
  }, []);

  const values = {
    timers,
    addTimer,
    getTimerValue,
    stopTheTimer,
    isStopped,
  };

  return (
    <TimerContext.Provider value={values}>{children}</TimerContext.Provider>
  );
}
