import React, { useState } from "react";
import { Helmet } from "react-helmet";
import "./App.css";
import Timer from "./component/Timer.js";
import Button from "./component/Button.js";

function App() {
  const [mode, setMode] = useState("light");

  // 타이머 상태를 App에서 관리하도록 추가
  const [isRunning, setIsRunning] = useState(false); // 추가
  const [isPaused, setIsPaused] = useState(false); // 추가

  // 타이머 초기화용 상태 추가
  const [resetFlag, setResetFlag] = useState(false); // 추가

  // 초기화 함수 (타이머 시간, 사이클까지 모두 초기화)
  const handleResetAll = () => {
    setIsRunning(false);
    setIsPaused(false);
    setResetFlag((prev) => !prev); // resetFlag를 토글해서 Timer에 신호 전달
  };

  return (
    <div className={mode === "dark" ? "App dark-mode" : "App light-mode"}>
      {/* 헤더 */}
      <Helmet>
        <title>365뽀모도로</title>
      </Helmet>
      <header className="header">
        <h1
          className="title"
          style={{ cursor: "pointer" }}
          onClick={() => window.location.reload()}
        >
          365 뽀모도로
        </h1>
        <p className="mode-toggle">
          <span
            className={mode === "light" ? "mode-btn active" : "mode-btn"}
            onClick={() => setMode("light")}
          >
            Light
          </span>
          {" | "}
          <span
            className={mode === "dark" ? "mode-btn active" : "mode-btn"}
            onClick={() => setMode("dark")}
          >
            Dark
          </span>
        </p>
      </header>

      {/* 타이머 */}
      <div className="timer">
        {/* <Timer /> */}
        {/* ↓ App에서 관리하는 상태를 props로 전달 */}
        <Timer
          isRunning={isRunning}
          isPaused={isPaused}
          setIsRunning={setIsRunning}
          setIsPaused={setIsPaused}
          resetFlag={resetFlag} // 추가
        />
      </div>

      {/* 버튼 그룹 */}
      <div className="button">
        {/* <Button /> */}
        {/* ↓ App에서 관리하는 상태와 초기화 함수를 props로 전달 */}
        <Button
          isRunning={isRunning}
          isPaused={isPaused}
          setIsRunning={setIsRunning}
          setIsPaused={setIsPaused}
          onReset={handleResetAll} // 추가
        />
      </div>
    </div>
  );
}

export default App;
