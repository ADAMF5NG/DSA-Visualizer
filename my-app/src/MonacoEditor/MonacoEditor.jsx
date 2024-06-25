import React, { useState, useRef, useEffect } from 'react';
import { Editor} from '@monaco-editor/react';
import LanguageSelector from './LanguageSelector';
import { CODE_SNIPPETS } from '../constants';
import Output from "./Output.jsx";

const MonacoEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language])
  }

  //console.log(language);

  return(
  <>
  <div className="flex justify-between">
  <div className="w-1/2">
        {/* Form content goes here */}
    <LanguageSelector onSelect={onSelect} />
    <div class="h-svh px-4 py-4 bg-white rounded-t-lg rounded-b-lg dark:bg-gray-800">
    <Editor
      options={{
        minimap: {
          enabled: false,
        },
      }}
      // width = "50vw"
      // height = "90vh"
      theme = "vs-dark"
      language = {language}
      defaultValue = {CODE_SNIPPETS[language]}
      onMount={onMount}
      value={value}
      onChange={(value) => setValue(value)}
      />
    </div>
    </div>
    <Output  language = {language} editorRef={editorRef}/>
    </div>
  </>
  )
}
export default MonacoEditor


//import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'; // Import Monaco Editor API

// const MonacoEditor = ({ language, theme}) => {
//     const editorRef = useRef(); // Create a reference for the editor container
//     const monacoRef = useRef(); // Create a reference for the Monaco editor instance
  
//     useEffect(() => {
//         // Clean up any existing editor instance before creating a new one
//         if (monacoRef.current) {
//             monacoRef.current.dispose(); // Dispose of the existing editor instance
//         }
  
//         // Create a new Monaco editor instance
//         monacoRef.current = monaco.editor.create(editorRef.current, {
//             // value: value, // Initial value of the editor
//             language: language, // Programming language for syntax highlighting
//             theme: theme, // Theme for the editor (e.g., 'vs-dark')
//             automaticLayout: true, // Automatically adjust layout
//         });
  
//         // Add an event listener to handle content changes in the editor
//         // monacoRef.current.onDidChangeModelContent(() => {
//         //     onChange(monacoRef.current.getValue()); // Call onChange with the new value
//         // });
  
//         // Clean up the editor instance when the component is unmounted
//         // return () => {
//         //     if (monacoRef.current) {
//         //         monacoRef.current.dispose(); // Dispose of the editor instance
//         //     }
//         // };
//     }, [language, theme]); // Run this effect when language or theme changes
  
//     // useEffect(() => {
//     //     // Update the editor's value when the value prop changes
//     //     if (monacoRef.current) {
//     //         monacoRef.current.setValue(value); // Set the new value
//     //     }
//     // }, [value]); // Run this effect when value changes
  
//     // Render the editor container
//     return <div ref={editorRef} style={{ width: '100%', height: '500px' }} />;
// };

// export default MonacoEditor; // Export the MonacoEditor component