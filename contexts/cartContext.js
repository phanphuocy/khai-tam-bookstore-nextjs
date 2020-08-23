import React, { createContext, useState, useEffect, useContext } from "react";
import useAPI from "../hooks/useAPI";
import CartModal from "../components/Modals/CartModal";
import { useAuth } from "./userContext";
import { useRouter } from "next/router";

const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [itemsState, setItemsState] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [pricesState, setPricesState] = useState({
    totalDiscounted: 0,
    totalWhole: 0,
    individual: [],
  });
  const [calculatingPrices, setCalculatingPrices] = useState(true);
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [modalIsOpen, setModal] = useState(false);

  const { authenticated } = useAuth();
  const router = useRouter();

  function readLsAndSaveItemsState() {
    let items = readCartItemLs();
    if (!items) {
      writeCartItemLs([]); // If user first visit website, new localstorage is set with empty array
    } else {
      setCalculatingPrices(true);
      updatePrices(items);
      setItemsState(items);
    }
  }

  function readLsAndSaveDeliveryState() {
    let delivery = localStorage.getItem("deliveryInfo");
    if (delivery) {
      setDeliveryInfo(JSON.parse(delivery));
    }
  }

  function readCartItemLs() {
    return JSON.parse(localStorage.getItem("cartItems"));
  }

  function writeCartItemLs(items) {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }

  function removeCartItemLs() {
    localStorage.removeItem("cartItems");
  }

  async function queryPrice(slug) {
    try {
      let query = await useAPI.get(`/api/v1/get-price?slug=${slug}`);
      if (query.status == 200) {
        return query.data.data;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async function updatePrices(items) {
    if (items.length <= 0) {
      return;
    }
    let totalWhole = 0,
      totalDiscounted = 0,
      individual = {};
    for (let i = 0; i < items.length; i++) {
      let prices = await queryPrice(items[i].slug);
      totalWhole = totalWhole + prices.whole * items[i].quanlity;
      totalDiscounted = totalDiscounted + prices.discounted * items[i].quanlity;
      individual = { ...individual, [items[i].slug]: prices };
    }
    setPricesState({ totalWhole, totalDiscounted, individual });
    setCalculatingPrices(false);
  }

  useEffect(() => {
    readLsAndSaveItemsState();
    setItemsLoading(false);
    readLsAndSaveDeliveryState();
  }, []);

  function appendBook(book) {
    function checkIfBookExists(slug) {
      let items = JSON.parse(localStorage.getItem("cartItems"));
      let slugs = items.map((item) => item.slug);
      if (slugs.indexOf(slug) !== -1) {
        return;
      }
    }

    checkIfBookExists(book.slug);

    let sanitized = {
      author: book.author,
      title: book.title,
      cover: book.cover,
      slug: book.slug,
      quanlity: 1,
    };
    let items = [...readCartItemLs(), sanitized];
    setCalculatingPrices(true);
    updatePrices(items);
    setItemsState(items);
    writeCartItemLs(items);
  }

  function removeBook(slug) {
    let items = readCartItemLs();
    items = items.filter((item) => item.slug !== slug);
    setCalculatingPrices(true);
    updatePrices(items);
    setItemsState(items);
    writeCartItemLs(items);
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

    setCalculatingPrices(true);
    updatePrices(newItems);
    setItemsState(newItems);
    writeCartItemLs(newItems);
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
