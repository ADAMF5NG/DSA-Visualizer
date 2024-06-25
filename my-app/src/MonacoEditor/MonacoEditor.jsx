import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
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
    setValue(CODE_SNIPPETS[language]);
  };

  return (
      <div className="row-span-2">
        <LanguageSelector onSelect={onSelect} />
        <div class="px-4 py-4 bg-white rounded-t-lg rounded-b-lg dark:bg-gray-800">
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            width = "100%"
            height = "90vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </div>
        </div>
  );
};
export default MonacoEditor;
