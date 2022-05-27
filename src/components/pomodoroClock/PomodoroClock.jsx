import "./PomodoroClock.styles.css";
import { useEffect, useState, useRef } from "react";
import { computeClockProgress } from "./PomodoroClock.helpers";
import { Toast } from "utils";

function PomodoroClock({ time, info, setTaskIsDone, timerIdRef }) {
  const TOTAL_TIME = time * 60;
  const PROGRESS_END_VALUE = TOTAL_TIME;
  const SPEED = 1000;

  const progressValueRef = useRef(time * 60);
  const [progressValue, setProgressValue] = useState(time * 60);

  useEffect(() => {
    if (progressValueRef.current === 0) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
      setTaskIsDone();
    }
  }, [progressValueRef.current]);

  useEffect(() => {
    if (info.start && !info.done && !timerIdRef.current) {
      startTimer();
      Toast.info("Task Started");
    } else if (info.pause && timerIdRef.current) {
      pauseTimer();
      Toast.info("Task Paused");
    } else if (info.restart) {
      restartTimer();
    }
  }, [info]);

  // * Here introducing modularity brings, passing 2-4 arguments to each function
  function startTimer() {
    let timerId = setInterval(() => {
      progressValueRef.current--;
      setProgressValue(progressValueRef.current);
    }, SPEED);
    timerIdRef.current = timerId;
  }

  function pauseTimer() {
    clearInterval(timerIdRef.current);
    timerIdRef.current = null;
  }

  function restartTimer() {
    pauseTimer();
    progressValueRef.current = TOTAL_TIME;
    setProgressValue(progressValueRef.current);
    startTimer();
  }

  // * Constantly updating for pomodoro clock
  let { clockMainColor, percentage, minutes, seconds } = computeClockProgress(
    progressValue,
    PROGRESS_END_VALUE
  );

  return (
    <div
      className="circular-progress"
      style={{
        background: `conic-gradient(
          ${clockMainColor} ${percentage * 3.6}deg,
          #cadcff ${percentage * 3.6}deg
      )`,
      }}
    >
      <div className="value-container">
        <div>
          {minutes}m : {seconds}s
        </div>
        <div>Out of {time} min</div>
      </div>
    </div>
  );
}

export { PomodoroClock };
