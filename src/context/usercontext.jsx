import { createContext, useContext, useState, useMemo } from "react";
import jwt_decode from "jwt-decode";

const UserDetails = createContext();

export function useUserDetails() {
  const context = useContext(UserDetails);
  if (!context) {
    throw new Error("useUserDetails must be used within a UserDetailsProvider");
  }
  return context;
}

export function UserDetailsProvider(props) {
  const userDetailsFromStorage = localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : null;

  var accessTokenFromStorage = false;
  var refreshTokenFromStorage = false;
  var nameFromStorage = false;
  var idFromStorage = false;

  if (userDetailsFromStorage != null) {
    if (userDetailsFromStorage.access) {
      accessTokenFromStorage = userDetailsFromStorage.access;
      const jwt_decoded = jwt_decode(accessTokenFromStorage);

      nameFromStorage = jwt_decoded.name;
    } else {
      accessTokenFromStorage = false;
      nameFromStorage = false;
    }

    refreshTokenFromStorage = userDetailsFromStorage.refresh
      ? userDetailsFromStorage.refresh
      : false;

    idFromStorage = userDetailsFromStorage.user.id
      ? userDetailsFromStorage.user.id
      : false;
  }

  const [userDetails, setUserDetails] = useState({
    accessToken: accessTokenFromStorage,
    refreshToken: refreshTokenFromStorage,
    name: nameFromStorage,
    id: idFromStorage,
  });

  const value = useMemo(() => {
    function updateUserDetails(accessToken, refreshToken, userId) {
      const newUserDetails = { ...userDetails };

      newUserDetails.accessToken = accessToken;
      newUserDetails.refreshToken = refreshToken;
      newUserDetails.id = userId

      if (newUserDetails.accessToken) {
        const jwt_decoded = jwt_decode(newUserDetails.accessToken);
        newUserDetails.name = jwt_decoded.name;
      } else {
        newUserDetails.name = false;
      }

      setUserDetails(newUserDetails);
    }
    return [{ ...userDetails }, updateUserDetails];
  }, [userDetails]);

  return <UserDetails.Provider value={value} {...props} />;
}
