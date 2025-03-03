// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://ec2-13-51-72-206.eu-north-1.compute.amazonaws.com:5000/api'
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
