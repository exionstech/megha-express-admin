import axios from 'axios';

const token =
  typeof window !== 'undefined' ? localStorage.getItem('token') : null;

export const axiosInstance = axios.create({
  baseURL: 'https://megha-backend.exionstech.workers.dev/api',
  headers: {
    Authorization: token ? `Bearer ${token}` : ''
  }
});
