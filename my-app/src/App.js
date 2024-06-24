// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
// import BarChart from './VisualizerComponents/BarChart.js'
// import randomInt from './VisualizerComponents/Randomizer.js'
import MonacoEditor from './MonacoEditor/MonacoEditor.jsx'
import LanguageSelector from './MonacoEditor/LanguageSelector.jsx';

function App() {

  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My Algorithm Visualizer</h1>
      </header>
      <main>
      <h1>Monaco Editor in React</h1>
      <MonacoEditor/>
      </main>
      <footer>
        <p>&copy; 2024 My Algorithm Visualizer</p>
      </footer>
    </div>
  );
}

export default App;
