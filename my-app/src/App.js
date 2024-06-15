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
        {/* <BarChart data = {data}/> */}
      </main>
      <footer>
        <p>&copy; 2024 My Algorithm Visualizer</p>
      </footer>
    </div>
  );
}


export default App;

// const array = [];
  // for(let i = 0; i < 5; i++){
  //   array.push(randomInt(5, 100));
  // };

  //const [code, setCode] = useState('I SEE YOU MANDY');

  // const handleEditorChange = (newValue) => {
  //   setCode(newValue);
  //   console.log(newValue)
  // };


  // const [data, setData] = useState(array);

  // const handleResize = () => {
  //   // Trigger a re-render by updating the state (or use a more complex resize handler if needed)
  //   setData([...data]);
  // };

  // useEffect(() => {
  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, [data]);