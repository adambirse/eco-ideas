const axios = require('axios');
const server = process.env.REACT_APP_SERVER_HOST || 'localhost';
const port = process.env.REACT_APP_SERVER_PORT || 5000;
const serverUrl = `http://${server}:${port}`;
const base = 'api';

export function securePost(body, resource, handleSuccess, handleFailure) {
    axios.post(serverUrl + '/' + base + '/' + resource,
        body, {
            withCredentials: true
        })
        .then((res) => {
            handleSuccess();
        })
        .catch((error) => {
            handleFailure(error.response);
        })
}

export function get(resource, handleSuccess, handleFailure) {
    axios.get(serverUrl + '/' + base + '/' + resource)
        .then(res => res.data)
            .then(data => {
                handleSuccess(data);
            })
            .catch((error) => {
                handleFailure(error.response);
            })
}