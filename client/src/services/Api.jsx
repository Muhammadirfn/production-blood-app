import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1'; // Set your base URL here
const API = axios.create({ baseURL: BASE_URL });

// In API module
API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});


export default API;
