import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { axiosReq, axiosRes, setAuthorizationHeader } from '../api/axiosDefaults';
import { useNavigate } from 'react-router-dom';

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleMount = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        setAuthorizationHeader({ access: accessToken });
        const { data } = await axiosRes.get('dj-rest-auth/user/');
        setCurrentUser(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useMemo(() => {
    const requestInterceptor = axiosReq.interceptors.request.use(
      async (config) => {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          try {
            const { data } = await axios.post('/dj-rest-auth/token/refresh/', { refresh: refreshToken });
            setAuthorizationHeader(data);
          } catch (err) {
            setCurrentUser(null);
            setAuthorizationHeader(null);
            navigate('/signin');
            return Promise.reject(err);
          }
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    const responseInterceptor = axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          const refreshToken = localStorage.getItem('refresh_token');
          if (refreshToken) {
            try {
              const { data } = await axios.post('/dj-rest-auth/token/refresh/', { refresh: refreshToken });
              setAuthorizationHeader(data);
              return axios(err.config);
            } catch (refreshErr) {
              setCurrentUser(null);
              setAuthorizationHeader(null);
              navigate('/signin');
            }
          } else {
            setCurrentUser(null);
            navigate('/signin');
          }
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosReq.interceptors.request.eject(requestInterceptor);
      axiosRes.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};