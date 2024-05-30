import { useContext } from "react";
import { TimerContext } from "../Context/TimerProvider";

export default function useTimer() {
  return useContext(TimerContext);
}
