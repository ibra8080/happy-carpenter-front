import axios from 'axios';
import { axiosReq, setAuthorizationHeader } from './axiosDefaults';

// Request interceptor for adjusting post ID
axiosReq.interceptors.request.use((config) => {
  console.log('Request interceptor:', config);
  
  return config;
}, (error) => {
  console.error('Request interceptor error:', error);
  return Promise.reject(error);
});

// Response interceptor for handling 401 errors and token refresh
axiosReq.interceptors.response.use(
  (response) => {
    console.log('Response interceptor:', response);
    return response;
  },
  async (error) => {
    console.error('Response interceptor error:', error);
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          console.log('Attempting to refresh token');
          const { data } = await axios.post('/dj-rest-auth/token/refresh/', { refresh: refreshToken });
          console.log('Token refresh successful');
          setAuthorizationHeader(data);
          error.config.headers['Authorization'] = `Bearer ${data.access}`;
          return axiosReq(error.config);
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          setAuthorizationHeader();
        }
      }
    }
    return Promise.reject(error);
  }
);