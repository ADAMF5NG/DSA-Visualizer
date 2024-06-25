import axios from "axios";

const API = axios.create({
    baseURL: "https://q6a6ohjk5d.execute-api.us-east-1.amazonaws.com/Staging"
})

export const executeCode = async (language, code) => {
    console.log('code', code);
    const response = await axios.post('https://q6a6ohjk5d.execute-api.us-east-1.amazonaws.com/Staging/python_code', {language, code});
    
    console.log("DONE here too", response.data);
    return response.data;
}