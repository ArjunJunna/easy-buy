import axios from 'axios';

const BASE_URL = 'https://easy-buy-api.onrender.com/api/v1';

const TOKEN = localStorage.getItem('token');

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: TOKEN ? { token: `Bearer ${TOKEN}` } : {},
});

userRequest.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['token'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
