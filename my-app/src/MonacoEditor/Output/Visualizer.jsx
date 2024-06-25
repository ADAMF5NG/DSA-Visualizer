import React, { useState } from "react";

const Visualizer = ({ runCode }) => {
  const [output, setOutput] = useState(
    'Click "Run Code" to see the output here'
  );

  return (
    <div class="row-span-1">
      <form>
        <div class="flex justify-start">
          <button
            onClick={() => {
              runCode();
            }}
            type="button"
            class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-0.5"
          >
            Run Code
          </button>
        </div>
      </form>
      <div class="h-full px-4 py-4 bg-white rounded-t-lg rounded-b-lg dark:bg-gray-600">
        
      </div>
    </div>
  );
};
export default Visualizer;
