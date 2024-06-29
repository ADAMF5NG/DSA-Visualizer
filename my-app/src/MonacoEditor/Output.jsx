import React,  { useState } from 'react'
import { executeCode } from '../api';

const Output = ({editorRef, language}) => {
    const [output, setOutput] = useState(null);
    const runCode = async () =>{
        const sourceCode = editorRef.current.getValue();
        if(!sourceCode) return;
        console.log("Button Clicked")
        console.log(sourceCode)
        try{
            const {message}  = await executeCode(language, sourceCode); 
            setOutput(message)
        } catch (error){
            console.log(error);
        }
    }

    return(
        <>
        <form class = "w-1/2 items-start mx-1">
            <div class="flex justify-start">
                <label for="languages" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Output</label>
            </div>
            <div class="flex justify-start">
                <button onClick={() => {runCode()}} type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-0.5">Run Code</button>
            </div>
            <div class="h-svh px-4 py-4 bg-white rounded-t-lg rounded-b-lg dark:bg-gray-800">
       <div >
           {/* <textarea id="editor" rows="8" class="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder='Click "Run Code" to see the output here' required ></textarea> */}
           <div class="p-4 md:p-5 space-y-4">
           {
             output ? output : 'Click "Run Code" to see the output here'
           }
           </div>
       </div>
   </div>
        </form>
        </>
    );
};
export default Output