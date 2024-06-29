import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";

const MonacoEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
    console.log(editor);
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

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
    }
  };

  return (
    <>
      <div className="row-span-2">
        <LanguageSelector onSelect={onSelect}/>
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
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
            onClick={() => {console.log("DO ONCLICK WORKS?")}}
            wrapperProps={{
              onDoubleClick: () => {
                insertText(`\tIS THIS INSERTION WORKING\t`);
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
