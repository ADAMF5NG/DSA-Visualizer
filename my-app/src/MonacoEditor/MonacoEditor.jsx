import React, { useState, useRef } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import DataStructureSelector from "./DataStructureSelector";
import { CODE_SNIPPETS, DATASTRUCTURE } from "../constants";
import Output from "./Output";

const MonacoEditor = () => {
  const editorRef = useRef();
  const [defaultCode, setDefaultCode] = useState(CODE_SNIPPETS["javascript"]);
  const [language, setLanguage] = useState("javascript");
  const [dataStructure, setDataStructure] = useState("D1_array");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelectLanguage = (language) => {
    setLanguage(language);
    setDefaultCode(CODE_SNIPPETS[language]);
  };

  const onSelectDataStructure = (dataStructure) => {
    setDataStructure(dataStructure);
  }

  const insertText = (text) => {
    let monacoInstance = editorRef.current;
    if (monacoInstance) {
        const selection = monacoInstance.getSelection();
        const id = { major: 1, minor: 1 };
        const op = {
            identifier: id,
            range: {
                startLineNumber: selection?.selectionStartLineNumber || 1,
                startColumn: selection?.selectionStartColumn || 1,
                endLineNumber: selection?.endLineNumber || 1,
                endColumn: selection?.endColumn || 1,
            },
            text,
            forceMoveMarkers: true,
        };
        monacoInstance.executeEdits('my-source', [op]);
        monacoInstance.trigger('anyString', 'editor.action.formatDocument')
    }
  };

  return (
    <>
      <div className="row-span-2">
        <>
        <LanguageSelector onSelect={onSelectLanguage}/>
        <DataStructureSelector onSelect={onSelectDataStructure}/>
        </>
        <div class="px-4 py-4 bg-white rounded-t-lg rounded-b-lg dark:bg-gray-800">
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            width="100%"
            height="120vh"
            theme="vs-dark"
            language={language}
            defaultValue={defaultCode}
            onMount={onMount}
            value={defaultCode}
            onChange={(value) => setDefaultCode(value)}
            wrapperProps={{
              onDoubleClick: () => {
                insertText(DATASTRUCTURE["D1_array"].function("hello", language));
              }
            }}
          />
        </div>
      </div>
      <Output language={language} editorRef={editorRef} />
    </>
  );
};
export default MonacoEditor;
