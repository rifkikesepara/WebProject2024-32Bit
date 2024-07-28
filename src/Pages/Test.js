import { Paper, Stack } from "@mui/material";
import { getCollapsedReceiptsByDate } from "../Utils/receipts";
import { useEffect, useState } from "react";

export default function Test() {
  // initialize timeLeft with the seconds prop
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    // exit early when we reach 0
    // if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev + 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  return (
    <div>
      <h1>{timeLeft}</h1>
    </div>
  );
}
