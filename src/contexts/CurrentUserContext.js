import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
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

  const refreshTokenRef = useRef(null);

  refreshTokenRef.current = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        console.log('No refresh token found');
        throw new Error('No refresh token available');
      }
      console.log('Attempting to refresh token...');
      const { data } = await axios.post('/dj-rest-auth/token/refresh/', { refresh: refreshToken });
      setAuthorizationHeader(data);
      console.log('Token refreshed successfully');
    } catch (error) {
      console.error('Error refreshing token:', error);
      removeTokens();
      setCurrentUser(null);
      navigate("/signin");
      throw error; // Re-throw to be caught by the caller
    }
  }, [navigate]);

  const handleMount = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      console.log('Access token:', accessToken ? 'exists' : 'does not exist');
      
      if (!accessToken) {
        console.log('No access token found, attempting to refresh...');
        await refreshTokenRef.current();
      }
      
      console.log('Attempting to fetch user data...');
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      console.log('User data fetched successfully:', data);
      setCurrentUser(data);
    } catch (err) {
      console.error("Error fetching current user:", err.response ? err.response.data : err.message);
      console.error("Error status:", err.response ? err.response.status : 'No response');
      console.error("Error headers:", err.response ? err.response.headers : 'No headers');
      setCurrentUser(null);
    }
  }, []);

  useEffect(() => {
    handleMount();
  }, [handleMount]);

  useEffect(() => {
    const refreshTokenInterceptor = axiosReq.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          try {
            console.log('401 error detected, attempting to refresh token...');
            await refreshTokenRef.current();
            return axiosReq(error.config);
          } catch (refreshError) {
            console.error('Token refresh failed in interceptor:', refreshError);
            setCurrentUser(null);
            removeTokens();
            navigate("/signin");
          }
        }
        return Promise.reject(error);
      }
    );
  
    return () => {
      axiosReq.interceptors.response.eject(refreshTokenInterceptor);
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

export const removeTokens = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  setAuthorizationHeader(null);  // This will remove Authorization headers
  console.log('Tokens removed from storage and axios instances');
};