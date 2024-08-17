import axios from 'axios';
import { axiosReq, setAuthorizationHeader } from './axiosDefaults';

axiosReq.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const { data } = await axios.post('/dj-rest-auth/token/refresh/', { refresh: refreshToken });
          setAuthorizationHeader(data);
          error.config.headers['Authorization'] = `Bearer ${data.access}`;
          return axiosReq(error.config);
        } catch (refreshError) {
          setAuthorizationHeader();
        }
      }
    }
    return Promise.reject(error);
  }
);
