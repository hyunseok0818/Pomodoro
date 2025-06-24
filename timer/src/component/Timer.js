import React, { useState, useEffect, useRef } from "react";
import "./timer.css";

// 기존: 내부에서 running 상태 관리
// function Timer() {
//   const [running, setRunning] = useState(true);
function Timer({ isRunning, isPaused, setIsRunning, setIsPaused, resetFlag }) {
  const TIMES = { work: 25 * 60, rest: 5 * 60 };
  const [mode, setMode] = useState("work");
  const [time, setTime] = useState(TIMES.work);

  const [cycle, setCycle] = useState(() => {
    const savedCycle = localStorage.getItem("pomodoroCycle");
    return savedCycle ? Number(savedCycle) : 0;
  });

  // startTime: 타이머가 시작된 절대 기준 시각
  const [startTime, setStartTime] = useState(() => {
    const savedStart = localStorage.getItem("pomodoroStartTime");
    return savedStart ? Number(savedStart) : null;
  });

  // 알림 소리 ref 추가
  const audioRef = useRef(null);

  // resetFlag가 true일 때만 초기화
  useEffect(() => {
    if (resetFlag) {
      setMode("work");
      setTime(TIMES.work);
      setCycle(0);
      setStartTime(null);
      localStorage.setItem("pomodoroCycle", "0");
      localStorage.setItem("pomodoroStartTime", "");
    }
  }, [resetFlag]);

  // isRunning이 true로 바뀔 때
  useEffect(() => {
    if (!isRunning) return;

    if (startTime === null) {
      // 리셋 버튼을 누르면, 지금 시간으로 startTime 세팅
      const now = Date.now();
      setStartTime(now);
      localStorage.setItem("pomodoroStartTime", now.toString());
    } else {
      // 정지 후 다시 시작하는 경우
      // startTime 보정해서 다시 설정
      const now = Date.now();
      const adjustedStart = now - (TIMES[mode] - time) * 1000;
      setStartTime(adjustedStart);
      localStorage.setItem("pomodoroStartTime", adjustedStart.toString());
    }
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning) return;
    if (startTime === null) return; // startTime 없으면 대기

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000);
      const total = TIMES[mode];
      const remaining = total - elapsed;

      if (remaining <= 0) {
        // 소리 재생 추가
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        }

        const nextMode = mode === "work" ? "rest" : "work";
        setMode(nextMode);

        const newStart = Date.now();
        setStartTime(newStart);
        localStorage.setItem("pomodoroStartTime", newStart.toString());

        if (mode === "rest") {
          setCycle((prev) => {
            const newCycle = prev + 1;
            localStorage.setItem("pomodoroCycle", newCycle.toString());
            return newCycle;
          });
        }

        setTime(TIMES[nextMode]);
      } else {
        setTime(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, mode, startTime]);

  const format = (t) =>
    `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(
      2,
      "0"
    )}`;

  return (
    <div className="incircle">
      {/* 알림 소리 오디오 태그 추가 */}
      <audio ref={audioRef} src="/alarm.mp3" preload="auto" />
      <svg className="circle" width="533" height="533" viewBox="0 0 533 533">
        <circle className="outcircle" cx="266.5" cy="266.5" r="240" />
        <text className="timetext" x="266.5" y="276.5" textAnchor="middle">
          {format(time)}
        </text>
      </svg>
      <p className={mode === "work" ? "mode-text work" : "mode-text rest"}>
        {mode === "work" ? "🔥 집중모드" : "🛌 휴식모드"}
      </p>
      <div className="cycle-box">순환 횟수: {cycle}</div>
    </div>
  );
}

export default Timer;
