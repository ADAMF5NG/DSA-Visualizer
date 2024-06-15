import React from 'react'
import { LANGUAGES } from '../constants';

const languages = Object.entries(LANGUAGES)


const LanguageSelector = ({onSelect}) => {
    const handleSelect = (e) => {
        const selectedValue = e.target.value;
        const languageName = selectedValue.substring(0, selectedValue.indexOf(' '));
        onSelect(languageName);
      };
    
    return(
        <>
        <form class="max-w-sm mx-auto">
            <label for="languages" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Select an option</label>
            <select 
                id="languages"
                onChange={handleSelect}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {
                    languages.map(([language, version]) => (
                        <option key ={language}>
                                {language + ' ' + version} 
                        </option>
                    ))
                }
            </select>
        </form>
        </> 
    );
};

export default LanguageSelector
