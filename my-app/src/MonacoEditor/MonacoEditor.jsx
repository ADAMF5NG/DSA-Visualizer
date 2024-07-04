import React, { useState, useRef } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import DataStructureSelector from "./DataStructureSelector";
import { CODE_SNIPPETS, DATASTRUCTURE } from "../constants";
import Output from "./Output";

const MonacoEditor = () => {
  const editorRef = useRef();
  const [defaultCode, setDefaultCode] = useState(CODE_SNIPPETS["python"]);
  const [language, setLanguage] = useState("python");
  const [functionName, setFunctionName] = useState("_____");

  /**[TODO]: Include more data structure as we continue this project (not now) */
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
      monacoInstance.trigger('keyboard', 'type', {text: '\n'}); //enters before the thing is called so it is a proper enter
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
      {
        /*[TODO]: Make sure indentation is auto fixed in the end */
      }
      //monacoInstance.trigger('keyboard', 'tab', null); //tabs come after being placed
      monacoInstance.executeEdits("my-source", [op]);
      //monacoInstance.trigger("anyString", "editor.action.formatDocument"); // no need?

    }
  };

  const funcName = () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try{
      setFunctionName(sourceCode.substring(sourceCode.indexOf("[")+1, sourceCode.indexOf("]")));
    } catch(error){
      console.log(error);
    }
  }



  return (
    <>
      <div className="row-span-2">
        <>
        <div className="flex auto">
        <LanguageSelector onSelect={onSelectLanguage}/>
        <DataStructureSelector onSelect={onSelectDataStructure}/>
        </div>
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
                funcName();
                insertText(DATASTRUCTURE[dataStructure].function(functionName, language));
              }
            }}
          />
        </div>
      </div>
      <Output language={language} editorRef={editorRef} dsType={dataStructure} />
    </>
  );
};
export default MonacoEditor;
