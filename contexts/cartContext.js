import React, { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [itemsState, setItemsState] = useState([]);

  useEffect(() => {
    let items = JSON.parse(localStorage.getItem("cartItems"));
    console.log("LS", items);
    if (items === null) {
      localStorage.setItem("cartItems", JSON.stringify(itemsState)); // If user first visit website, new localstorage is set with empty array
    } else {
      setItemsState(items); // If user reload the page, read from localstorage and set data to state
    }
  }, []);

  function appendBook(book) {
    let items = JSON.parse(localStorage.getItem("cartItems"));
    let slugs = items.map((item) => item.slug);
    if (slugs.indexOf(book.slug) !== -1) {
      return;
    }
    let sanitized = {
      author: book.author,
      prices: book.prices,
      title: book.title,
      cover: book.cover,
      slug: book.slug,
    };
    items = [...items, sanitized];
    setItemsState(items);
    localStorage.setItem("cartItems", JSON.stringify(items));
  }

  function removeBook(slug) {
    setItems(items.filter((book) => book.slug === slug));
  }

  return (
    <CartContext.Provider
      value={{
        items: itemsState,
        appendBook,
        removeBook,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartContextProvider;

export function useCart() {
  const context = useContext(CartContext);
  console.log("USE CONTEXT", context);
  return context;
}
