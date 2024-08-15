import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { axiosReq, axiosRes } from '../api/axiosDefaults';

// Create contexts
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

// Custom hooks to use contexts
export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

// Define the CurrentUserProvider component
export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const { data } = await axiosRes.get('dj-rest-auth/user/');
      console.log("User data received:", data);
      setCurrentUser(data);
    } catch (err) {
      if (err.response?.status !== 403) {
        console.log("Error fetching user data:", err);
      }
      setCurrentUser(null);
    }
  };

  // Set up interceptors using useMemo to avoid re-creating them on every render
  useMemo(() => {
    // Response interceptor to handle token refresh
    axiosRes.interceptors.response.use(
      response => response,
      async (error) => {
        const { response } = error;
        const originalRequest = error.config;

        if (response && response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const refreshToken = localStorage.getItem('refresh_token');

          try {
            const { data } = await axios.post('/dj-rest-auth/token/refresh/', {
              refresh_token: refreshToken,
            });

            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);

            axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;

            return axios(originalRequest);
          } catch (err) {
            console.error('Token refresh failed:', err);
            setCurrentUser(null);
            window.location.href = '/signin';
            return Promise.reject(err);
          }
        }

        return Promise.reject(error);
      }
    );

    // Request interceptor to attach access token
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

  }, []);

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
