import axios from "axios";

export const executeCode = async (language, code) => {
    const response = await axios.post('https://4vpfqpv8wc.execute-api.us-east-2.amazonaws.com/execute', {language, code});
    return response.data;
}