import React from "react";

// 기존: 내부에서 useState로 상태 관리
// import React, { useState } from "react";
// function Button() {
//   const [isRunning, setIsRunning] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);

function Button({ isRunning, isPaused, setIsRunning, setIsPaused, onReset }) {
  // props로 상태와 setter 받기
  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
    console.log("타이머 시작");
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(true);
    console.log("타이머 정지");
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    if (onReset) onReset(); // 추가: App에서 내려준 초기화 함수 호출
    console.log("타이머 초기화");
  };

  return (
    <div className="buttons">
      <button className="btn start" onClick={handleStart} disabled={isRunning}>
        시작
      </button>
      <button className="btn stop" onClick={handleStop} disabled={!isRunning}>
        정지
      </button>
      <button className="btn reset" onClick={handleReset}>
        초기화
      </button>
    </div>
  );
}

export default Button;
