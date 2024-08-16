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
            console.log("Redirecting to home: User is logged in");
            navigate("/");
          } else if (localStorage.getItem('access_token')) {
            try {
              console.log("Verifying token");
              await axios.post("/dj-rest-auth/token/verify/", {
                token: localStorage.getItem('access_token'),
              });
              console.log("Token valid, redirecting to home");
              navigate("/");
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

    const timer = setTimeout(() => {
      handleMount();
    }, 500);  // Increased delay to 500ms

    return () => clearTimeout(timer);
  }, [navigate, userAuthStatus, currentUser]);

  return isLoading;
};