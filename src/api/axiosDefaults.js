import axios from "axios";

axios.defaults.baseURL = "https://happy-carpenter-ebf6de9467cb.herokuapp.com/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();

export const setAuthorizationHeader = (data) => {
  if (data?.access) {
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    axiosReq.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
    axiosRes.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
  } else {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete axiosReq.defaults.headers.common["Authorization"];
    delete axiosRes.defaults.headers.common["Authorization"];
  }
};

axiosReq.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
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
      if (refreshToken) {
        try {
          const { data } = await axios.post('/dj-rest-auth/token/refresh/', {
            refresh: refreshToken
          });
          setAuthorizationHeader(data);
          return axiosRes(originalRequest);
        } catch (refreshError) {
          console.log('Refresh token error:', refreshError);
          setAuthorizationHeader(null);
          // Optionally, redirect to login page or dispatch a logout action here
        }
      } else {
        // No refresh token available, clear any existing tokens
        setAuthorizationHeader(null);
        // Optionally, redirect to login page or dispatch a logout action here
      }
    }
    return Promise.reject(error);
  }
);

axiosRes.interceptors.response.use(
  (response) => {
    console.log("Response received:", response);
    return response;
  },
  (error) => {
    console.error("Response error:", error.response || error);
    return Promise.reject(error);
  }
);
