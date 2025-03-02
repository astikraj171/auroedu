// src/api.js
import axios from 'axios';

// Create an Axios instance with a base URL
const API = axios.create({
  baseURL: 'http://localhost:5000/api' // Adjust for your deployment
});

// Optional: Attach token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
