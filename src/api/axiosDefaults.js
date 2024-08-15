import axios from 'axios';

// Set up default axios configuration
axios.defaults.baseURL = 'https://happy-carpenter-ebf6de9467cb.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

// Create axios instances
export const axiosReq = axios.create();
export const axiosRes = axios.create();

// Response interceptor for axiosRes
axiosRes.interceptors.response.use(
  response => response,
  async (error) => {
    const { response } = error;
    const originalRequest = error.config;

    if (response && response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');

      if (!refreshToken) {
        // Redirect to login if no refresh token is available
        window.location.href = '/signin';
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post('/dj-rest-auth/token/refresh/', {
          refresh_token: refreshToken,
        });

        // Update local storage with new tokens
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);

        // Update axios default headers
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;

        // Retry the original request with the new token
        return axios(originalRequest);
      } catch (err) {
        console.error('Token refresh failed:', err);
        // Redirect user to sign-in page if token refresh fails
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/signin';
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

// Request interceptor for axiosReq to attach the access token
axiosReq.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
