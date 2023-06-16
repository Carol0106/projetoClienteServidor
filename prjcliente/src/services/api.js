import axios from "axios";

const api = axios.create({
    baseURL: 'http://10.20.8.51:24100'
});

export default api;