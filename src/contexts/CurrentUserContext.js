import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useNavigate } from "react-router-dom";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useEffect(() => {
    const refreshTokenInterceptor = axiosReq.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
            return axiosReq(error.config);
          } catch (refreshError) {
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
  delete axiosReq.defaults.headers.common["Authorization"];
  delete axiosRes.defaults.headers.common["Authorization"];
  // Ensure axios instance is updated
  axios.defaults.headers.common["Authorization"] = "";
};