import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const handleMount = async () => {
    try {
      const { data: userData } = await axiosRes.get("dj-rest-auth/user/");
      console.log("User data fetched:", userData);
      
      if (userData?.id) {
        try {
          const { data: profileData } = await axiosReq.get(`profiles/${userData.id}/`);
          console.log("Profile data fetched:", profileData);
          
          // Combine user and profile data
          const combinedData = {
            ...userData,
            profile: profileData
          };
          
          setCurrentUser(combinedData);
          console.log("Combined user and profile data:", combinedData);
        } catch (err) {
          console.log("Error fetching profile:", err);
          // If profile doesn't exist, set user data without profile
          setCurrentUser(userData);
        }
      } else {
        setCurrentUser(userData);
      }
    } catch (err) {
      console.log("Error fetching user:", err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};