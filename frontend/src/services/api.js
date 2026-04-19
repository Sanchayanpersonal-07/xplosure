import axios from 'axios';
import toast from 'react-hot-toast';
import { API_BASE_URL, TOKEN_KEY } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor — attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || 'Something went wrong';

    if (status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      // ✅ FIX: Dispatch custom event so AuthProvider can clear React state
      // instead of hard window.location redirect which skips React cleanup
      window.dispatchEvent(new CustomEvent('auth:logout'));
      if (!window.location.pathname.includes('/login')) {
        toast.error('Session expired. Please login again.');
      }
    } else if (status === 403) {
      toast.error('You do not have permission to do this.');
    } else if (status === 409) {
      // Conflict — let component handle (e.g. duplicate booking)
      toast.error(message);
    } else if (status === 429) {
      toast.error('Too many requests. Please slow down.');
    } else if (status === 500) {
      toast.error('Server error. Please try again later.');
    } else if (status !== 400 && status !== 404) {
      // 400 validation errors handled at component level
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default api;
