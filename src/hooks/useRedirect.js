import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useRedirect = (userAuthStatus) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleMount = async () => {
      try {
        console.log("useRedirect: Checking authentication status");
        const refreshToken = localStorage.getItem('refresh_token');
        console.log("useRedirect: Refresh token exists:", !!refreshToken);
        
        if (!refreshToken) {
          console.log("useRedirect: No refresh token, redirecting to signin");
          if (userAuthStatus === "loggedOut") {
            navigate("/signin");
          }
          return;
        }
        
        const response = await axios.post("/dj-rest-auth/token/refresh/", {
          refresh: refreshToken
        });
        console.log("useRedirect: Token refresh response:", response.data);
        
        // if user is logged in, the code below will run
        if (userAuthStatus === "loggedIn") {
          console.log("useRedirect: User is logged in, redirecting to home");
          navigate("/");
        }
      } catch (err) {
        console.log("useRedirect: Token refresh error:", err.response?.data || err.message);
        // if user is not logged in, the code below will run
        if (userAuthStatus === "loggedOut") {
          console.log("useRedirect: User is not logged in, redirecting to signin");
          navigate("/signin");
        }
      }
    };

    handleMount();
  }, [navigate, userAuthStatus]);
};