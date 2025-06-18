import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      {/* 헤더 */}
      <header className="header">
        <h1 className="title">365 뽀모도로</h1>
        <p className="mode-toggle">Light | Dark</p>
      </header>

      {/* 타이머 영역 (추후 구현) */}
      <div className="timer-area"></div>

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
