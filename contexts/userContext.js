import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import useAPI from "../hooks/useAPI";
import { useRouter } from "next/router";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userState, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  async function saveForLater(book) {
    let bookToAdd = {
      author: book.author,
      title: book.title,
      slug: book.slug,
      cover: book.cover,
      category: book.category,
      subcategory: book.subcategory,
    };
    let res = await useAPI.post("/api/v1/add-book-to-wishlist", bookToAdd);
    if (res.status === 200) {
      setUserState(res.data.user);
    }
  }

  function signoutHandler() {
    router.push("/");
    setUserState(null);
    localStorage.removeItem("token");
  }

  async function getUser() {
    const token = localStorage.getItem("token");

    if (token) {
      useAPI.defaults.headers.Authorization = token;
      const { data } = await useAPI.get("/api/v1/get-user");
      if (data) {
        setUserState(data.user);
      }
    }
    setLoading(false);
  }

  function setUser(user) {
    setUserState(user);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userState,
        authenticated: userState !== null,
        loading,
        saveForLater: saveForLater,
        signoutHandler,
        setUser,
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
