// src/App.js
import React, { useState, useEffect } from "react";
import "./App.css";
// import BarChart from './VisualizerComponents/BarChart.js'
// import randomInt from './VisualizerComponents/Randomizer.js'
import MonacoEditor from "./MonacoEditor/MonacoEditor.jsx";
import Output from "./MonacoEditor/Output.jsx";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My Algorithm Visualizer</h1>
      </header>
      <div className="m-5">
        <h1>Monaco Editor in React</h1>
        <div className="h-full grid grid-cols-2 grid-rows-2 gap-y-11 gap-x-1">
          <MonacoEditor />
          <Output />
        </div>
      </div>
    </div>
  );
}

export default App;
