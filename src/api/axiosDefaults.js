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

// Set up interceptors
axiosReq.interceptors.request.use(
  (config) => {
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