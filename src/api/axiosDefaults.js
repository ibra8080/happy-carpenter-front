import axios from 'axios';

axios.defaults.baseURL = 'https://happy-carpenter-ebf6de9467cb.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const axiosReq = axios.create();
export const axiosRes = axios.create();

axiosReq.interceptors.request.use(
  async config => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosRes.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      try {
        const { data } = await axios.post('/dj-rest-auth/token/refresh/', { refresh: refreshToken });
        localStorage.setItem('access_token', data.access);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
        axiosReq.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
        axiosRes.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.log('Refresh token error', refreshError);
        // Handle refresh token error (e.g., logout user, redirect to login)
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const setAuthorizationHeader = (data) => {
  if (data?.access) {
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    axiosReq.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
    axiosRes.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
  } else {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete axiosReq.defaults.headers.common['Authorization'];
    delete axiosRes.defaults.headers.common['Authorization'];
  }
};