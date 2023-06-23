import axios from "axios";

const api = axios.create({
    baseURL: 'http://10.20.8.80:25000'
});

export default api;