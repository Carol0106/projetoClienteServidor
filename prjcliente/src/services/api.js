import axios from "axios";

const api = axios.create({
    baseURL: 'http://10.20.8.186:22400'
});

export default api;