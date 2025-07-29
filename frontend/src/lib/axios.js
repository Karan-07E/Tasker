import axios from 'axios';

//in development, use localhost:5001, in production use the current domain with /api
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : `${window.location.origin}/api`;
const api = axios.create({
    baseURL: BASE_URL,
});

export default api;