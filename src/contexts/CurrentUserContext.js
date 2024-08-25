import { createContext, useContext, useEffect, useState } from "react";
import { axiosRes, axiosReq } from "../api/axiosDefaults";

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
  
      if (userData?.pk) {
        try {
          const profileId = userData.pk + 2;
          const { data: profileData } = await axiosReq.get(`/profiles/${profileId}/`);
          console.log("Profile data fetched:", profileData);
          
          const combinedData = {
            ...userData,
            profile: profileData
          };
          
          setCurrentUser(combinedData);
          console.log("Combined user and profile data:", combinedData);
        } catch (err) {
          console.log("Error fetching profile:", err);
          if (err.response?.status === 404) {
            console.log("Profile not found for user. They might need to create one.");
          }
          setCurrentUser(userData);
        }
      } else {
        console.log("No user PK found in user data");
        setCurrentUser(null);
      }
    } catch (err) {
      console.log("Error fetching user:", err);
      setCurrentUser(null);
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
