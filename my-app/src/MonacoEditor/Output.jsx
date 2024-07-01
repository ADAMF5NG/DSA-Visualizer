import React, { useState } from "react";
import { executeCode } from "../api.js";
import Terminal from "./Output/Terminal.jsx";
import Visualizer from "./Output/Visualizer.jsx";

const Output = ({ editorRef, language, dsType }) => {
  const [loading, setloading] = useState(false);
  const [output, setOutput] = useState(
    'Click "Run Code" to see the output here'
  );
//   maybe add a loading section

  //console.log(dsType);


  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setloading(true);
      const {message}= await executeCode(language, sourceCode);
    //   console.log(message);
      setOutput(message);
    } catch (error) {
      console.log(error);
    }
    finally{ 
      setloading(false);
    }
  };

  return (
    <>
      <Visualizer runCode = {runCode} dsType={dsType} loading ={loading}/>
      <Terminal output={output}/>
    </>
  );
};
export default Output;
