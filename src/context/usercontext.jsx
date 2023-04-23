import { createContext, useContext, useState, useMemo } from "react";
import jwt_decode from "jwt-decode";

const UserDetails = createContext();

export function useUserDetails(props) {
  const context = useContext(UserDetails);
  if (!context) {
    throw new Error("useUserDetails must be used within a UserDetailsProvider");
  }
  return context;
}

export function UserDetailsProvider(props) {
  const [userDetails, setUserDetails] = useState({
    accessToken: false,
    refreshToken: false,
    name: false,
  });

  const value = useMemo(() => {
    function updateUserDetails(accessToken, refreshToken) {
      const newUserDetails = { ...userDetails };
      newUserDetails.accessToken = accessToken;
      newUserDetails.refreshToken = refreshToken;

      const jwt_decode = jwt_decode(newUserDetails.accessToken);
      newUserDetails.name = jwt_decode.name;
      setUserDetails(newUserDetails);
    }
    return [{ ...userDetails }, updateUserDetails];
  }, [userDetails]);
  return <UserDetails.Provider value={value} {...props} />;
}
