import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../contexts/cartContext";
import PropTypes from "prop-types";
import Button from "../atomics/Button";

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
    z-index: 1000;
    pointer-events: auto;
    /* padding: ${({ theme }) =>
      `${theme.spacing["3"]} ${theme.spacing["8"]}`}; */
    display: flex;
    flex-direction: column;

    .container__heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: ${({ theme }) =>
        `${theme.spacing["4"]} ${theme.spacing["6"]} ${theme.spacing["3"]}`};
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      background-color: ${({ theme }) => theme.colors.gray["900"]};

      .container__heading-label {
        display: flex;
        align-items: center;
        img {
          margin-right:${({ theme }) => theme.spacing["2"]};
        }
      }
    }

    .content {
      padding: ${({ theme }) => `${theme.spacing["3"]} ${theme.spacing["6"]}`};
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      flex-grow: 1;
      overflow-y: scroll;
    }
    .action {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      padding: ${({ theme }) =>
        `${theme.spacing["3"]} ${theme.spacing["6"]} ${theme.spacing["4"]}`};
      ul {
      }
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
        display: flex;
        button,
        input {
          max-width: 3rem;
          padding: ${({ theme }) => theme.spacing["2"]};
          /* border: 2px solid lightblue; */
          text-align: center;
        }
        input {
          border:${({ theme }) => `1px solid ${theme.colors.gray["700"]}`};
        }
      }
    }
  }

  .dim {
    color:${({ theme }) => theme.colors.gray["400"]};
  }

  .action {
    table.action__pricing {
      margin: ${({ theme }) => `${theme.spacing["2"]} 0`};
      border-bottom:${({ theme }) =>
        `1px solid ${theme.colors.border.default}`};
      td {
        padding:${({ theme }) => `${theme.spacing["1"]} ${theme.spacing["2"]}`};
      }
    }
  }
`;

const CartItems = ({
  items,
  removeBook,
  prices,
  changeQuanlity,
  currencyFormat,
}) => {
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
              <p className="row-info__prices">
                {new Intl.NumberFormat("vi-VN", currencyFormat).format(
                  prices.individualPrices[book.slug].discounted
                )}{" "}
                <small
                  className="dim"
                  style={{ textDecoration: "line-through" }}
                >
                  {new Intl.NumberFormat("vi-VN", currencyFormat).format(
                    prices.individualPrices[book.slug].whole
                  )}
                </small>
              </p>
              <button
                className="remove-btn"
                onClick={() => removeBook(book.slug)}
              >
                Xóa
              </button>
            </div>
            <div className="row-action">
              <div className="book-quanlity-actions">
                <Button
                  disabled={book.nbOfItems <= 1}
                  icon={faMinus}
                  onClick={() =>
                    quanlityActionsHandler(book.slug, book.nbOfItems - 1)
                  }
                />
                <input
                  value={book.nbOfItems}
                  onChange={(e) =>
                    quanlityActionsHandler(book.slug, e.target.value)
                  }
                />
                <Button
                  icon={faPlus}
                  onClick={() =>
                    quanlityActionsHandler(book.slug, book.nbOfItems + 1)
                  }
                />
              </div>
              <p className="dim">
                <small>Thành tiền:</small>
              </p>
              <p>
                {new Intl.NumberFormat("vi-VN", currencyFormat).format(
                  prices.individualPrices[book.slug].discounted * book.nbOfItems
                )}
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
    handleCheckoutBtn,
  } = useCart();

  const currencyFormat = {
    style: "currency",
    currency: "VND",
  };

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
            <div className="container__heading">
              <h6 className="container__heading-label">
                <img
                  src={require("../../public/illustrations/basket-3d.svg")}
                  alt=""
                  width="28px"
                />
                Giỏ Hàng Của Bạn
              </h6>
              <Button label="Đóng" onClick={closeCartModal} />
            </div>
            <div className="container__content content">
              <CartItems
                currencyFormat={currencyFormat}
                items={items}
                removeBook={removeBook}
                prices={prices}
                changeQuanlity={changeQuanlity}
              />
            </div>
            <div className="container__action action">
              <table className="action__pricing">
                <tbody>
                  <tr>
                    <td>Tổng giá bìa:</td>
                    <td style={{ textDecoration: "line-through" }}>
                      <strong>
                        {new Intl.NumberFormat("vi-VN", currencyFormat).format(
                          prices.wholePrice
                        )}
                      </strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Đã giảm:</td>
                    <td>
                      <strong>
                        {new Intl.NumberFormat("vi-VN", currencyFormat).format(
                          prices.wholePrice - prices.discountedPrice
                        )}{" "}
                        (
                        {Math.round(
                          ((prices.wholePrice - prices.discountedPrice) /
                            prices.wholePrice) *
                            100
                        )}
                        %)
                      </strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Tạm tính:</td>
                    <td>
                      <strong>
                        {new Intl.NumberFormat("vi-VN", currencyFormat).format(
                          prices.discountedPrice
                        )}
                      </strong>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="action__checkout">
                <Button
                  label="Thanh Toán"
                  primary
                  onClick={handleCheckoutBtn}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {modalIsOpen && <div className="mask"></div>}
    </StyledContainer>
  );
};

export default CartModal;
