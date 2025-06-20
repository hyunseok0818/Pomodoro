import React, { useState, useEffect } from "react";
import "../timer.css";

// 기존: 내부에서 running 상태 관리
// function Timer() {
//   const [running, setRunning] = useState(true);

function Timer({ isRunning, isPaused, setIsRunning, setIsPaused, resetFlag }) {
  // props로 상태와 resetFlag 받기
  const TIMES = { work: 25 * 60, rest: 5 * 60 };
  const [mode, setMode] = useState("work");
  const [time, setTime] = useState(TIMES.work);
  const [cycle, setCycle] = useState(0);

  // resetFlag가 바뀔 때마다 타이머와 사이클 초기화
  useEffect(() => {
    setMode("work");
    setTime(TIMES.work);
    setCycle(0);
  }, [resetFlag]);

  useEffect(() => {
    if (!isRunning) return; // running → isRunning으로 변경

    if (time === 0) {
      const next = mode === "work" ? "rest" : "work";
      setMode(next);
      setTime(TIMES[next]);

      if (mode === "rest") {
        setCycle((prev) => prev + 1);
      }

      return;
    }

    const timerId = setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [isRunning, time, mode]); // running → isRunning

  const format = (t) =>
    `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(
      2,
      "0"
    )}`;

  return (
    <div className="incircle">
      <svg className="circle" width="533" height="533" viewBox="0 0 533 533">
        <circle className="outcircle" cx="266.5" cy="266.5" r="240" />
        <text className="timetext" x="266.5" y="276.5" textAnchor="middle">
          {format(time)}
        </text>
      </svg>
      <div className="cycle-box">순환 횟수: {cycle}</div>
    </div>
  );
}

export default Timer;
