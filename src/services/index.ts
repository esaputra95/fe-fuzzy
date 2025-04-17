import axios from "axios";

const api = axios.create();

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        config.baseURL = 'http://localhost:3000/'
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export {api}
