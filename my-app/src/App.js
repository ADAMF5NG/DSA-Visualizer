// src/App.js
import React from 'react';
import VisualizerComponent from './DSA-Visualizer/VisualizerComponent';

function App() {
  return (
    <div>

      <div className="text-center">
        <header className="bg-blue-500 text-white p-4">
          <h1 className="text-3xl font-bold">
            Welcome to Tailwind CSS with React!
          </h1>
        </header>
        <main className="p-4">
          <p className="text-lg">
            This is a simple example of using Tailwind CSS in a React application.
          </p>
        </main>
      </div>

      <div>
        <VisualizerComponent />
      </div>
    </div>
  );
}

export default App;