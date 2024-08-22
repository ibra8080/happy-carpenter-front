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
      
      if (userData?.username) {
        try {
          const { data: profilesData } = await axiosReq.get('profiles/');
          console.log("Profiles data fetched:", profilesData);
          
          let userProfile;
          if (Array.isArray(profilesData)) {
            userProfile = profilesData.find(profile => profile.owner === userData.username);
          } else if (profilesData && Array.isArray(profilesData.results)) {
            userProfile = profilesData.results.find(profile => profile.owner === userData.username);
          }
          
          if (userProfile) {
            const combinedData = {
              ...userData,
              profile: userProfile
            };
            
            setCurrentUser(combinedData);
            console.log("Combined user and profile data:", combinedData);
          } else {
            console.log("No profile found for user");
            setCurrentUser(userData);
          }
        } catch (err) {
          console.log("Error fetching profile:", err);
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