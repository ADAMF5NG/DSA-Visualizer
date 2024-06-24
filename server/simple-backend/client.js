const axios = require('axios');

const data = {
    language: 'java',
    code: 'public class HelloWorld {public static void main(String[] args) {System.out.println("Hello, World");}}'
};

axios.post('http://localhost:9000/2015-03-31/functions/function/invocations', data, {
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => {
    console.log('Response:', response.data);
})
.catch(error => {
    console.error('Error:', error.response ? error.response.data : error.message);
});