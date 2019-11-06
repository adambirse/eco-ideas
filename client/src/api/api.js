const axios = require('axios');
const base = '/api';

export async function securePost(body, resource) {
    return await axios.post( base + '/' + resource, body, {
        withCredentials: true
    });
}

export async function post(body, resource) {
    return await axios.post( base + '/' + resource, body);
}

export async function get(resource) {
    const {data} = await axios.get( base + '/' + resource);
    return data;
}