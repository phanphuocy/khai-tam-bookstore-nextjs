import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../contexts/cartContext";
import PropTypes from "prop-types";

// Import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const StyledContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;

  .container {
    ${({ theme }) => theme.borderRadius["rounded-lg"]};
    border: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
    background-color: white;
    width: 100%;
    max-width: 960px;
    height: 100%;
    max-height: ${(props) => (props.isTaller ? "90vh" : "70vh")};
    z-index: 100;
    pointer-events: auto;
    padding: ${({ theme }) => `${theme.spacing["3"]} ${theme.spacing["8"]}`};
    display: flex;
    flex-direction: column;

    .heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: ${({ theme }) => `${theme.spacing["3"]} 0`};
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }

    .content {
      padding: ${({ theme }) => `${theme.spacing["3"]} 0`};
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      flex-grow: 1;
      overflow-y: scroll;
    }
    .action {
      padding: ${({ theme }) => `${theme.spacing["3"]} 0`};
    }
  }

  .mask {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.05);
  }

  .cart-book-row {
    display: flex;
    padding: ${({ theme }) => `${theme.spacing["2"]} 0`};
    min-height: 8rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);

    .row-cover {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      margin-right: ${({ theme }) => theme.spacing["4"]};
      max-width: ${({ theme }) => theme.spacing["24"]};
    }
    .row-info {
      margin-top: ${({ theme }) => theme.spacing["3"]};
      flex-grow: 1;

      .remove-btn {
        color: orangered;
      }
    }

    .row-action {
      padding: ${({ theme }) => `0 ${theme.spacing[4]}`};
      .book-quanlity-actions {
        border: 1px solid green;

        button,
        input {
          max-width: 3rem;
          padding: ${({ theme }) => theme.spacing["2"]};
          border: 2px solid lightblue;
          text-align: center;
        }
      }
    }
  }
`;

const CartItems = ({ items, removeBook, prices, changeQuanlity }) => {
  if (items.length === 0) {
    return <div>No Items</div>;
  }

  function quanlityActionsHandler(bookslug, newQuanlity) {
    if (newQuanlity <= 0) {
      return;
    }
    changeQuanlity(bookslug, newQuanlity);
  }

  return (
    <div>
      <ul>
        {items.map((book, i) => (
          <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: (i + 1) * 0.1 }}
            className="cart-book-row"
            key={book.slug}
          >
            <div className="row-cover">
              <img
                src={`http://khaitam.com${book.cover}`}
                alt={`Book cover of ${book.title}`}
                width="100%"
                height="100%"
              />
            </div>
            <div className="row-info">
              <p>{book.title}</p>
              <p style={{ textDecoration: "line-through" }}>
                {prices.individualPrices[book.slug].whole}
              </p>
              <p>{prices.individualPrices[book.slug].discounted}</p>
              <button
                className="remove-btn"
                onClick={() => removeBook(book.slug)}
              >
                Xóa
              </button>
            </div>
            <div className="row-action">
              <div
                className="book-quanlity-actions"
                style={{ display: "inlineBlock" }}
              >
                <button
                  onClick={() =>
                    quanlityActionsHandler(book.slug, book.nbOfItems - 1)
                  }
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <input
                  value={book.nbOfItems}
                  onChange={(e) =>
                    quanlityActionsHandler(book.slug, e.target.value)
                  }
                />
                <button
                  onClick={() =>
                    quanlityActionsHandler(book.slug, book.nbOfItems + 1)
                  }
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <p>Thành tiền:</p>
              <p>
                {prices.individualPrices[book.slug].discounted * book.nbOfItems}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

CartItems.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      cover: PropTypes.string.isRequired,
    })
  ),
};

const CartModal = () => {
  const {
    items,
    modalIsOpen,
    closeCartModal,
    removeBook,
    prices,
    changeQuanlity,
  } = useCart();

  return (
    <StyledContainer isTaller={items.length > 3}>
      <AnimatePresence>
        {modalIsOpen && (
          <motion.div
            className="container"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="heading">
              <h6>CART MODAL</h6>
              <button onClick={closeCartModal}>Đóng</button>
            </div>
            <div className="content">
              <CartItems
                items={items}
                removeBook={removeBook}
                prices={prices}
                changeQuanlity={changeQuanlity}
              />
            </div>
            <div className="action">
              <ul>
                <li>
                  <span>Tổng giá bìa:</span>
                  <span style={{ textDecoration: "line-through" }}>
                    {prices.wholePrice}
                  </span>
                </li>
                <li>
                  <span>Tạm tính:</span>
                  <span>{prices.discountedPrice}</span>
                </li>
                <li>
                  <span>Đã giảm:</span>
                  <span>
                    {prices.wholePrice - prices.discountedPrice} đ (
                    {Math.round(
                      ((prices.wholePrice - prices.discountedPrice) /
                        prices.wholePrice) *
                        100
                    )}
                    %)
                  </span>
                </li>
              </ul>
              <button>Check Out</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {modalIsOpen && <div className="mask"></div>}
    </StyledContainer>
  );
};

export default CartModal;
