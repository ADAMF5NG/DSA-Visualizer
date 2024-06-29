import React, {useState} from 'react'
import { LANGUAGES } from '../constants';

const languages = Object.entries(LANGUAGES)

const LanguageSelector = ({onSelect}) => {
    const [languageName, setLanguageName] = useState('');

    const handleSelect = (e) => {
        const selectedValue = e.target.value;
        const languageName = selectedValue.substring(0, selectedValue.indexOf(' '));
        setLanguageName(languageName);
        onSelect(languageName);
      };
    
    return(
        <>
        <form class="flex-auto">
            <select 
                id="languages"
                onChange={handleSelect}
                class="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-0.5">
                {
                    languages.map(([language, version]) => (
                        <option key ={language}
                            className={`${
                                languageName === language
                                ? 'text-blue-400 bg-gray-900'
                                : 'bg-transparent'
                            }hover:text-blue-400 hover:bg-gray-900`} 
                        >
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
