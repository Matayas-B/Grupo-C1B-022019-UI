import axios from 'axios';

const server = process.env.VUE_APP_LOCALSERVER;

axios.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';

const API = {
    get: path => axios.get(`${server}${path}`).then(response => response.data),
    put: (path, body) => axios.put(`${server}${path}`, body).then(response => response.data),
    post: (path, body) => axios.post(`${server}${path}`, body).then(response => response.data),
};

export default API;