import axios from "axios";

const api = axios.create({
    baseURL: 'http://10.40.2.166:24000'
});

export default api;