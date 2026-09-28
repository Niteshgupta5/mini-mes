import axios, { AxiosError, type AxiosInstance } from 'axios';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';

const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT ?? 15000);

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('mes_token');
  console.log('token', token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('config', config);

  return config;
});

api.interceptors.response.use(
  (response) => response,

  (error: AxiosError<{ message?: string | string[] }>) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('mes_token');

      if (window.location.pathname !== '/login') {
        window.location.assign('/login');
      }
    }

    return Promise.reject(error);
  },
);

export function getApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;

    if (Array.isArray(message)) {
      return message.join(', ');
    }

    return message ?? error.message ?? 'Request failed';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Request failed';
}
