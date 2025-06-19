import React, { useState } from "react";
import "./App.css";
import Timer from "./timer.js";

function App() {
  const [mode, setMode] = useState("light");

  return (
    <div className={`App ${mode === "dark" ? "dark-mode" : "light-mode"}`}>
      {/* 헤더 */}
      <header className="header">
        <h1 className="title">365 뽀모도로</h1>
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

      {/* 타이머 영역 (추후 구현) */}
      <div className="timer-area">
        <Timer />
      </div>

      {/* 버튼 그룹 */}
      <div className="buttons">
        <button className="btn start">시작</button>
        <button className="btn stop">정지</button>
        <button className="btn reset">초기화</button>
      </div>
    </div>
  );
}

export default App;
