import React from 'react'
import { LANGUAGES } from '../constants';

const languages = Object.entries(LANGUAGES)

const LanguageSelector = () => {
    return(
        <>
        {/* <Text mb={2} fontSize='lg'> Language:</Text> */}
        <form class="max-w-sm mx-auto">
            <label for="languages" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
            <select id="languages" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Choose a Language</option>
                <option value="US">javascript</option>
                <option value="CA">java</option>
                <option value="FR">python</option>
                <option value="DE">c#</option>
            </select>
        </form>
        </> 
    );
};

export default LanguageSelector
