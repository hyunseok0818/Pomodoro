import React from "react";
import { Helmet } from "react-helmet";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>365 뽀모도로</title>
      </Helmet>
      <header className="App-header">
        <p className="header-left">365 뽀모도로</p>
        <p className="mode-toggle">Light | Dark</p>
      </header>
    </div>
  );
}

export default App;
