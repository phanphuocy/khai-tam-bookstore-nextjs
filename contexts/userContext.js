import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import useAPI from "../hooks/useAPI";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userState, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = localStorage.getItem("token");

      if (token) {
        console.log("Got a token in the cookies, let's see if it is valid");
        useAPI.defaults.headers.Authorization = token;
        const { data } = await useAPI.get("/api/v1/get-user");
        if (data) {
          setUserState(data.user);
        }
      }
      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userState,
        authenticated: userState !== null,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(UserContext);
  return context;
}

export default UserContextProvider;
