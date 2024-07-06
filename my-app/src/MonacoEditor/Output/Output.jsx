import React, { useState } from "react";
import { executeCode } from "../../api.js";
import Terminal from "./Terminal.jsx";
import Visualizer from "./Visualizer.jsx";

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(
    'Click "Run Code" to see the output here'
  );
  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      const { message } = await executeCode(language, sourceCode);
      console.log(message);
      setOutput(message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Visualizer runCode={runCode} />
      <Terminal />
    </>
  );
};
export default Output;