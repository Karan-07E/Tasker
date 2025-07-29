import axios from 'axios';

// Always use localhost for development
const BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? "http://localhost:5001/api" 
    : `${window.location.origin}/api`;

const api = axios.create({
    baseURL: BASE_URL,
});

export default api;