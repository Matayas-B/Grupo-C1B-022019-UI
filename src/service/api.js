import axios from 'axios';


axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,authorization';  
//axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';

//const server = 'http://localhost:8080';
//export VUE_APP_SERVER="https://viendasya-c1b-backend.herokuapp.com"

const server = process.env.VUE_APP_LOCALSERVER;

const API = {
    get: path => axios.get(`${server}${path}`).then(response => response.data),
    put: (path, body) => axios.put(`${server}${path}`, body).then(response => response.data),
    post: (path, body) => axios.post(`${server}${path}`, body).then(response => response.data),
};

export default API;