import axios from 'axios';

const api_base_url = 'http://localhost:5001';

const api = axios.create({
    baseURL: api_base_url,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
    }
);

export default api;
