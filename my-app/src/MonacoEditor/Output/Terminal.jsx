import React, { useState } from "react";

const Terminal = ({ output }) => {
  //console.log(output)

  return (
    <div class="row-span-1">
      <div class="h-full w-full px-4 py-4 bg-white rounded-t-lg rounded-b-lg dark:bg-gray-800">
        <div>
          {/* <textarea id="editor" rows="8" class="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder='Click "Run Code" to see the output here' required ></textarea> */}
          <p class="text-white text-left font-mono p-4 md:p-5 space-y-4">
            {output ? output : 'Click "Run Code" to see the output here'}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Terminal;
