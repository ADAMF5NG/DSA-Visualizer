import axios from "axios";

const API = axios.create({
    baseURL: "https://4vpfqpv8wc.execute-api.us-east-2.amazonaws.com"
})

export const executeCode = async (language, code) => {
    const response = await API.post('/execute', {language, code});
    console.log(response)
    return response.data;
}