import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { axiosReq, axiosRes, setAuthorizationHeader } from "../api/axiosDefaults";
import { useNavigate } from "react-router-dom";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const refreshToken = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        // If no refresh token, clear any potentially stale data
        setCurrentUser(null);
        setAuthorizationHeader(null);
        return;
      }
      const { data } = await axios.post('/dj-rest-auth/token/refresh/', { refresh: refreshToken });
      setAuthorizationHeader(data);
      return data.access;
    } catch (error) {
      console.error('Error refreshing token:', error);
      setCurrentUser(null);
      setAuthorizationHeader(null);
      navigate("/signin");
    }
  }, [navigate]);

  const handleMount = useCallback(async () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      setCurrentUser(null);
      return;
    }
    
    try {
      const { data } = await axiosRes.get("/dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      console.error("Error fetching current user:", err);
      await refreshToken();
    }
  }, [refreshToken]);

  useEffect(() => {
    handleMount();
  }, [handleMount]);

  useEffect(() => {
    const interceptor = axiosReq.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          try {
            await refreshToken();
            return axiosReq(error.config);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosReq.interceptors.response.eject(interceptor);
    };
  }, [refreshToken]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export const removeTokens = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  setAuthorizationHeader(null);
};

