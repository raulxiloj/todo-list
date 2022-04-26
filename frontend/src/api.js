import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:8000/api/task'
});

const getRequest = (URL) => {
    return client.get(`${URL}`).then(response => response);
}

const postRequest = (URL, data) => {
    return client.post(`${URL}`, data).then(response => response);
}

const patchRequest = (URL, data) => {
    return client.patch(`${URL}`, {...data}).then(response => response);
}

const deleteRequest = (URL) => {
    return client.delete(`${URL}`).then(response => response);
}

export {
    getRequest,
    postRequest,
    patchRequest,
    deleteRequest
}