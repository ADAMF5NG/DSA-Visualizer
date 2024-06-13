import React from 'react';
import './App.css';
import BarChart from './BarChart.js'

function App() {
  const data = [30, 86, 168, 281, 303, 365];
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My Algorithm Visualizer</h1>
      </header>
      <main>
        <BarChart data = {data}/>
      </main>
      <footer>
        <p>&copy; 2024 My Algorithm Visualizer</p>
      </footer>
    </div>
  );
}

export default App;