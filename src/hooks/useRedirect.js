import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";

export const useRedirect = (userAuthStatus) => {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    const handleMount = async () => {
      try {
        if (userAuthStatus === "loggedIn" && !currentUser) {
          // Redirect to signin if we expect a logged-in user but don't have one
          navigate("/signin");
        } else if (userAuthStatus === "loggedOut" && currentUser) {
          // Redirect to home if we expect a logged-out user but have one
          navigate("/");
        }
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [navigate, userAuthStatus, currentUser]);
};