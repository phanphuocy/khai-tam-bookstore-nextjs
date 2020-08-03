import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../hooks/useAPI";
import CartModal from "../components/Modals/CartModal";
import { useAuth } from "./userContext";
import { useRouter } from "next/router";

const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [itemsState, setItemsState] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [pricesState, setPricesState] = useState({
    discountedPrice: 0,
    wholePrice: 0,
    individualPrices: [],
  });
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [modalIsOpen, setModal] = useState(false);
  const [allPrices, setAllPrices] = useState(null);
  const [pricesLoading, setPricesLoading] = useState(true);

  const { authenticated } = useAuth();
  const router = useRouter();

  async function getPricesAndSaveState(items) {
    let pricesRes = await api.get("/api/v1/get-prices", {
      params: {
        cartItems: encodeURI(JSON.stringify(items.map((item) => item.slug))),
      },
    });
    if (pricesRes.status !== 200) {
      return console.log("Error");
    }

    let { individualPrices } = pricesRes.data.data;

    let wholePrice = 0;
    let discountedPrice = 0;

    for (let i = 0; i < items.length; i++) {
      if (individualPrices[items[i].slug].whole) {
        wholePrice =
          wholePrice +
          individualPrices[items[i].slug].whole * items[i].quanlity;
      } else {
        wholePrice =
          wholePrice +
          individualPrices[items[i].slug].discounted * items[i].quanlity;
      }
      discountedPrice =
        discountedPrice +
        individualPrices[items[i].slug].discounted * items[i].quanlity;
    }

    setPricesState({
      ...pricesState,
      individualPrices,
      discountedPrice,
      wholePrice,
    });
  }

  function updatePricesAfterQuanlityChange(items) {
    let wholePrice = 0;
    let discountedPrice = 0;

    let individualPrices = { ...pricesState.individualPrices };

    for (let i = 0; i < items.length; i++) {
      if (individualPrices[items[i].slug].whole) {
        wholePrice =
          wholePrice +
          individualPrices[items[i].slug].whole * items[i].quanlity;
      } else {
        wholePrice =
          wholePrice +
          individualPrices[items[i].slug].discounted * items[i].quanlity;
      }
      discountedPrice =
        discountedPrice +
        individualPrices[items[i].slug].discounted * items[i].quanlity;
    }

    // console.log("WHOLE", wholePrice);
    // console.log("DISCOUNTED", discountedPrice);

    setPricesState({
      ...pricesState,
      discountedPrice,
      wholePrice,
    });
  }

  useEffect(() => {
    // Get current cart items
    let items = JSON.parse(localStorage.getItem("cartItems"));
    if (items === null) {
      localStorage.setItem("cartItems", JSON.stringify(itemsState)); // If user first visit website, new localstorage is set with empty array
    } else {
      getPricesAndSaveState(items);
      setItemsState(items); // If user reload the page, read from localstorage and set data to state
    }
    setItemsLoading(false);

    // Get current delivery info
    let delivery = localStorage.getItem("deliveryInfo");
    if (delivery) {
      setDeliveryInfo(JSON.parse(delivery));
    }

    // Get prices
    const getPrices = async () => {
      let pricesRes = await api.get("/api/v1/get-all-prices");
      if (pricesRes.status === 200) {
        setAllPrices(pricesRes.data.data);
        setPricesLoading(false);
      }
    };
    getPrices();
  }, []);

  function appendBook(book) {
    let items = JSON.parse(localStorage.getItem("cartItems"));
    let slugs = items.map((item) => item.slug);
    if (slugs.indexOf(book.slug) !== -1) {
      return;
    }

    let sanitized = {
      author: book.author,
      title: book.title,
      cover: book.cover,
      slug: book.slug,
      quanlity: 1,
    };
    items = [...items, sanitized];
    getPricesAndSaveState(items);
    setItemsState(items);
    localStorage.setItem("cartItems", JSON.stringify(items));
  }

  function removeBook(slug) {
    let items = JSON.parse(localStorage.getItem("cartItems"));
    items = items.filter((item) => item.slug !== slug);
    getPricesAndSaveState(items);
    setItemsState(items);
    localStorage.setItem("cartItems", JSON.stringify(items));
  }

  function clearCart() {
    setItemsState([]);
    setPricesState({
      discountedPrice: 0,
      wholePrice: 0,
      individualPrices: [],
    });
  }

  function changeQuanlity(bookslug, newQuanlity) {
    console.log(newQuanlity);
    if (typeof newQuanlity !== "number") {
      console.log("Type Error");
      return;
    }
    let newItems = [...itemsState];
    newItems = newItems.map((item) => {
      if (item.slug === bookslug) {
        return { ...item, quanlity: newQuanlity };
      } else return item;
    });
    console.log(newItems);
    setItemsState(newItems);
    localStorage.setItem("cartItems", JSON.stringify(newItems));
    updatePricesAfterQuanlityChange(newItems);
  }

  function openCartModal() {
    setModal(true);
  }

  function closeCartModal() {
    setModal(false);
  }

  function handleCheckoutBtn() {
    closeCartModal();
    if (authenticated) {
      router.push("/thanh-toan/dia-chi");
    } else {
      router.push("/thanh-toan/dang-nhap");
    }
  }

  return (
    <CartContext.Provider
      value={{
        items: itemsState,
        loading: itemsLoading,
        prices: pricesState,
        allPrices: allPrices,
        pricesLoading: pricesLoading,
        deliveryInfo,
        modalIsOpen,
        clearCart,
        appendBook,
        removeBook,
        changeQuanlity,
        openCartModal,
        closeCartModal,
        setDeliveryInfo,
        handleCheckoutBtn,
      }}
    >
      {children}
      <CartModal />
    </CartContext.Provider>
  );
};
export default CartContextProvider;

export function useCart() {
  const context = useContext(CartContext);
  return context;
}
