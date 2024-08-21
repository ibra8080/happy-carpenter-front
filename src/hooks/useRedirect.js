import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";

export const useRedirect = (userAuthStatus) => {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    const handleMount = async () => {
      try {
        console.log("useRedirect: Starting redirect check");
        console.log("Current user:", currentUser);
        console.log("User auth status:", userAuthStatus);
        
        if (userAuthStatus === "loggedIn") {
          if (!currentUser) {
            console.log("Redirecting to signin: No user");
            navigate("/signin");
          }
        } else if (userAuthStatus === "loggedOut") {
          if (currentUser) {
            console.log("User is logged in, but on a loggedOut page");
            navigate("/");
          }
        }
      } catch (err) {
        console.log("Error in useRedirect:", err);
      }
    };

    handleMount();
  }, [navigate, userAuthStatus, currentUser]);
};