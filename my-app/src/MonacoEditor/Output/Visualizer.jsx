import React, { useState } from "react";
import BarChart from "../../VisualizerComponents/BarChart";
import { DATASTRUCTURE } from "../../constants";
import Array from "../../VisualizerComponents/Array";
import randomInt from "../../VisualizerComponents/Randomizer.js";

const generateData = () => randomInt(0, 100);

const Visualizer = ({runCode, dsType, rcLoading}) => {
  const [dsLoading, setDSloading] = useState(false);
  const [data, setData] = useState(generateData());
  
  const renderDS = () =>{
    console.log("IN HERE");
      switch(dsType){
        case 'D1_array':
          return <BarChart data={data} />;
        case 'D2_array':
          return (DATASTRUCTURE[dsType].comment);
        case 'D3_array':
          return (DATASTRUCTURE[dsType].comment);
        case 'D4_array':
          return (DATASTRUCTURE[dsType].comment);
        default:
          return (<p>Unsupported</p>);
      }
  };

  const reloadDS = () => {
    setDSloading(true);
    setTimeout(() => {setData(generateData()); setDSloading(false)}, 500);
  };
  
  return (
    <div class="row-span-1">
      <form>
        <div class="flex justify-start">

          <button
            onClick={() => {
              console.log("Clicked");
              runCode();
            }}
            type="button"
            class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-0.5"
          >
            {rcLoading ?   
            <svg class="animate-spin fa-solid fa-circle-notch h-5 w-5">
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>:
            'Run Code'}
          </button>

          <button
            onClick={() => {
              console.log("Clicked");
              reloadDS();
            }}
            type="button"
            class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            {dsLoading ?   
            <svg class="animate-spin fa-solid fa-circle-notch h-5 w-5">
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>:
            'Reset Data Structure'}
          </button>
        </div>
      </form>
      <div class="h-full px-4 py-4 bg-white rounded-t-lg rounded-b-lg dark:bg-gray-600">
        {/* DISPLAY DS */}
        {renderDS()}
      </div>
    </div>
  );
};
export default Visualizer;
