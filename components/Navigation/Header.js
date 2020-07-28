import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretSquareRight,
  faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useAuth } from "../../contexts/userContext";
import { useCart } from "../../contexts/cartContext";
import Button from "../atomics/Button";

const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.white};

  .row {
    border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray["800"]}`};
    width: 100%;
  }

  .quick-contacts-bar {
    ${({ theme }) => theme.maxWidths.maximum};
    padding: ${({ theme }) => `${theme.spacing["3"]} ${theme.spacing["2"]}`};
    display: flex;
    justify-content: flex-end;

    a {
      font-weight: bold;
    }

    .spacer {
      margin: ${({ theme }) => `0 ${theme.spacing["1"]}`};
    }
  }

  .nav-bar {
    ${({ theme }) => theme.maxWidths.maximum};
    padding: ${({ theme }) => `${theme.spacing["4"]} ${theme.spacing["2"]}`};
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-areas: "logo cart";

    .logo-container {
      grid-area: logo;
    }
    .quick-search {
      grid-area: search;
      display: none;
      width: 100%;

      #quick-search-input {
        border-radius: 1rem;
        border: ${({ theme }) => `1px solid ${theme.colors.gray["900"]}`};
        background-color: ${({ theme }) => theme.colors.gray["900"]};
        box-shadow: inset 3px 4px 8px rgba(122, 122, 122, 0.04),
          inset -3px -4px 8px rgba(122, 122, 122, 0.04);
        padding: ${({ theme }) =>
          `${theme.spacing["3"]} ${theme.spacing["6"]}`};
        width: 80%;
      }

      input#quick-search-input::-webkit-input-placeholder {
        color: ${({ theme }) => theme.colors.gray["500"]};
      }
      input#quick-search-input:focus {
        border: ${({ theme }) => `1px solid ${theme.colors.green["500"]}`};
      }
    }
    .sign-and-cart {
      grid-area: cart;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      a {
        margin-right: ${({ theme }) => theme.spacing["2"]};
      }

      .cart-btn {
        ${({ theme }) => theme.borderRadius["rounded-lg"]};
        background-color: ${({ theme }) => theme.colors.green["500"]};
        padding: ${({ theme }) =>
          `${theme.spacing["3"]} ${theme.spacing["4"]}`};
        color: white;
      }
      .cart-btn:hover,
      .cart-btn:active {
        background-color: ${({ theme }) => theme.colors.green["400"]};
      }
    }
  }

  .gray-bg {
    ${({ theme }) => theme.shadow.base};
    background-color: ${(props) =>
      props.sameElevate ? "white" : props.theme.colors.gray["900"]};
  }

  .lower-nav {
    ${({ theme }) => theme.maxWidths.maximum};
    display: flex;
    justify-content: flex-end;
    padding: ${({ theme }) => `${theme.spacing["3"]} ${theme.spacing["2"]}`};

    a {
      margin-right: ${({ theme }) => theme.spacing["2"]};
      color: ${({ theme }) => theme.colors.gray["300"]};
    }

    a:last-child {
      margin: 0;
    }

    .v-rule {
      width: 2px;
      height: 100%;
      background-color: gray;
    }
  }

  ${({ theme }) => theme.breakpoints.tablet} {
    .nav-bar {
      grid-template-columns: 1fr 2fr 1fr;
      grid-template-areas: "logo search cart";

      .quick-search {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;

const Header = ({ sameElevate, showPhoneNumbers }) => {
  const { userState, authenticated } = useAuth();

  const { items, openCartModal } = useCart();

  return (
    <StyledHeader sameElevate={sameElevate}>
      {showPhoneNumbers && (
        <div className="row">
          <div className="quick-contacts-bar">
            <span>HOTLINE</span>
            <FontAwesomeIcon icon={faCaretSquareRight} />
            <a href="tel:555-555-5555">555-555-5555</a>
            <span className="spacer"> - </span>
            <a href="tel:555-555-5555">555-555-5555</a>
          </div>
        </div>
      )}
      <div className="row">
        <div className="nav-bar">
          <div className="logo-container">
            <Link href="/">
              <a>
                <img
                  src="/brand-images/logo.png"
                  alt="Logotype Khai Tam"
                  width="200px"
                />
              </a>
            </Link>
          </div>
          <div className="quick-search">
            <input
              id="quick-search-input"
              type="text"
              size="30"
              width="100%"
              placeholder="Bạn tìm sách gì ? Nhập tên sách hoặc tác giả"
              onKeyDown={(e) => console.log("SUBMIT", e)}
            />
          </div>
          <div className="sign-and-cart">
            {authenticated && userState ? (
              <div className="">
                <Link href="/me">
                  <a>Xin Chào, {userState.name} </a>
                </Link>
              </div>
            ) : (
              <div>
                <a>Đăng Nhập</a>
                <a>Đăng Ký</a>
              </div>
            )}

            {/* <button className="cart-btn" onClick={openCartModal}>
              Giỏ Hàng ({items.length})
            </button> */}
            <Button
              label={`Giỏ Hàng (${items.length})`}
              onClick={openCartModal}
              primary
              icon={faShoppingBasket}
            />
          </div>
        </div>
      </div>
      <div className="row gray-bg">
        <div className="lower-nav" id="begin-of-content">
          <a>Về Khai Tâm</a>
          <div className="v-rule"></div>
          <a>Vì Sao Chọn Khai Tâm?</a> <div className="v-rule"></div>
          <a>Hỗ Trợ Mua Hàng</a> <div className="v-rule"></div>
          <Link href="/chia-se-sach-hay#begin-of-content">
            <a>Chia Sẻ Sách Hay</a>
          </Link>
        </div>
      </div>
    </StyledHeader>
  );
};

Header.defaultProps = {
  sameElevate: false,
  showPhoneNumbers: true,
};

export default Header;
