const axios = require('axios');
const server = process.env.REACT_APP_SERVER_HOST || 'localhost';
const port = process.env.REACT_APP_SERVER_PORT || 5000;
const serverUrl = `http://${server}:${port}`;
const base = 'api';

export async function securePost(body, resource) {
    await axios.post(serverUrl + '/' + base + '/' + resource, body, {
        withCredentials: true
    });
}

export async function post(body, resource) {
    await axios.post(serverUrl + '/' + base + '/' + resource, body);
}

export async function get(resource) {
    const {data} = await axios.get(serverUrl + '/' + base + '/' + resource);
    return data;
}