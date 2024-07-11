import React, {useState} from 'react'
import { DATASTRUCTURE } from '../constants';

const DSA = Object.entries(DATASTRUCTURE)

const DataStructureSelector = ({onSelect}) => {
    const [dataStructure, setDataStructure] = useState('');

    const handleSelect = (e) => {
        const dataStructure = e.target.value;
        setDataStructure(dataStructure);
        onSelect(dataStructure);
        //console.log(dataStructure);
      };
    
    return(
        <>
        <form class="flex-auto">
            <select 
                id="data-structure"
                onChange={handleSelect}
                class="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-0.5">
                {
                    DSA.map(([dsa]) => (
                        <option key ={dsa}
                            className={`${
                                dataStructure === dsa
                                ? 'text-blue-400 bg-gray-900'
                                : 'bg-transparent'
                            }hover:text-blue-400 hover:bg-gray-900`} 
                        >
                                {dsa} 
                        </option>
                    ))
                }
            </select>
        </form>
        </> 
    );
};

export default DataStructureSelector
