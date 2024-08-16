import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import axios from "axios";

export const useRedirect = (userAuthStatus) => {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleMount = async () => {
      try {
        console.log("useRedirect: Starting redirect check");
        console.log("Current user:", currentUser);
        console.log("User auth status:", userAuthStatus);
        
        if (userAuthStatus === "loggedIn") {
          if (!currentUser && !localStorage.getItem('access_token')) {
            console.log("Redirecting to signin: No user and no token");
            navigate("/signin");
          }
        } else if (userAuthStatus === "loggedOut") {
          if (currentUser) {
            console.log("User is logged in, but on a loggedOut page");
            // Instead of redirecting, we'll just log this
          } else if (localStorage.getItem('access_token')) {
            try {
              console.log("Verifying token");
              await axios.post("/dj-rest-auth/token/verify/", {
                token: localStorage.getItem('access_token'),
              });
              console.log("Token valid, but on a loggedOut page");
              // Instead of redirecting, we'll just log this
            } catch (err) {
              console.log("Token invalid, removing from storage");
              localStorage.removeItem('access_token');
              localStorage.removeItem('refresh_token');
            }
          }
        }
      } catch (err) {
        console.log("Error in useRedirect:", err);
      } finally {
        console.log("Setting isLoading to false");
        setIsLoading(false);
      }
    };

    handleMount();
  }, [navigate, userAuthStatus, currentUser]);

  return isLoading;
};