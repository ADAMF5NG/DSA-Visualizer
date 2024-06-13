import React, { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

const MonacoEditor = ({ language, theme, value, onChange }) => {
    const editorRef = useRef(null);
    const monacoRef = useRef(null);
  
    useEffect(() => {
      if (monacoRef.current) {
        monacoRef.current.dispose(); // Dispose of any existing editor instance
      }
  
      monacoRef.current = monaco.editor.create(editorRef.current, {
        value: value,
        language: language,
        theme: theme,
        automaticLayout: true, // Automatically adjust layout
      });
  
      monacoRef.current.onDidChangeModelContent(() => {
        onChange(monacoRef.current.getValue());
      });
  
      return () => {
        if (monacoRef.current) {
          monacoRef.current.dispose();
        }
      };
    }, [language, theme]);
  
    useEffect(() => {
      if (monacoRef.current) {
        monacoRef.current.setValue(value);
      }
    }, [value]);
  
    return <div ref={editorRef} style={{ width: '100%', height: '500px' }} />;
  };
  
  export default MonacoEditor;