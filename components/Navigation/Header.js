import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCaretSquareRight,
  faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useAuth } from "../../contexts/userContext";
import { useCart } from "../../contexts/cartContext";
import Button from "../atomics/Button";
import useAPI from "../../hooks/useAPI";
import { useRouter } from "next/router";
import debounce from "lodash.debounce";
import links from "../../constants/header-links";
import { motion } from "framer-motion";
import MenuItems from "./MenuItems";

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
    span {
      margin-right:${({ theme }) => theme.spacing["2"]};
    }
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
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-areas: "logo search cart";


    .logo-container {
      grid-area: logo;
    }
    .quick-search {
      grid-area: search;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;

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

      .quick-search__results {
        ${({ theme }) => theme.borderRadius["rounded-lg"]};
        ${({ theme }) => theme.shadow.base};
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        z-index: 50;
        background-color: white;

        div.quick-search__total {
          background-color:${({ theme }) => theme.colors.gray["800"]};
          padding:${({ theme }) =>
            `${theme.spacing["4"]} ${theme.spacing["6"]}`};
          display: flex;
          justify-content: space-between;

          a {
            text-decoration: underline;
            color:${({ theme }) => theme.colors.green["500"]};
          }
          
        }

        ul.quick-search__results-container {
          padding:${({ theme }) =>
            `${theme.spacing["4"]} ${theme.spacing["6"]}`};
          li.quick-search__results-item {
            padding:${({ theme }) => `${theme.spacing["1"]} 0`};
            border-bottom:${({ theme }) =>
              `1px solid ${theme.colors.border.default}`};

            &:last-of-type {
              border-bottom:none;
            }
          }
        }
      }
    }
    .sign-and-cart {
      grid-area: cart;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      a:last-of-type {
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

    .hamburger-menu {
      grid-area: menu;
      justify-self: flex-end;
      display: none;
     

      .hamburger-menu__panel {
        /* Position */
        position: fixed;
        height: 100%;
        width: 80%;
        top:0;
        left: 0;
        z-index: 1000;
        /* Styling */
        background-color: white;
        ${({ theme }) => theme.shadow.base};    
        overflow-y: scroll;  

      }

      .hamburger-menu__mask {
        /* Position */
        position: fixed;
        height: 100%;
        width: 100%;
        top:0;
        left: 0;
        z-index: 800;
        /* Styling */
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
  }

  .gray-bg {
    ${({ theme }) => theme.shadow.base};
    /* background-color: ${(props) =>
      props.sameElevate ? "white" : props.theme.colors.gray["900"]}; */
    background-color: ${(props) =>
      props.sameElevate ? "white" : props.theme.colors.neutral.behrSnowTint1};
  }

  .lower-nav {
    ${({ theme }) => theme.maxWidths.maximum};
    display: flex;
    justify-content: flex-end;
    padding: ${({ theme }) => `${theme.spacing["3"]} ${theme.spacing["2"]}`};

    a,
    span {
      display: inline-block;
      margin-right: ${({ theme }) => theme.spacing["2"]};
      color: ${({ theme }) => theme.colors.gray["300"]};
      padding: ${({ theme }) => `0 ${theme.spacing["2"]}`};
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

  .hover__source {
    position: relative;
    text-decoration: none;
    .hover__target {
      display: none;
      position: absolute;
      z-index: 500;
    }
    ul.linksDrop {
      ${({ theme }) => theme.shadow.base};
      ${({ theme }) => theme.borderRadius["rounded"]};
      width: 160%;
      /* top: 120%; */
      left: -10%;
      /* padding-left: 10%; */
      background-color: ${(props) =>
        props.sameElevate ? "white" : props.theme.colors.gray["900"]};
      margin-bottom: ${({ theme }) => theme.spacing["2"]};

      li.linksDrop__item {
        margin: ${({ theme }) => `${theme.spacing["1"]} ${theme.spacing["2"]}`};
        padding: ${({ theme }) =>
          `${theme.spacing["2"]} ${theme.spacing["2"]}`};
        &:hover,
        &:active {
          background-color: ${({ theme }) => theme.colors.gray["700"]};
        }
      }
    }
  }
  .hover__source:hover > .hover__target,
  .hover__target:hover {
    display: block;
  }

  a.sign-link {
    ${({ theme }) => theme.borderRadius["rounded"]};
    padding: ${({ theme }) => `${theme.spacing["2"]} ${theme.spacing["2"]}`};

    &:hover,
    &:active {
      background-color: ${({ theme }) => theme.colors.gray["800"]};
      text-decoration: none;
    }
  }
  
  
  ${({ theme }) => theme.breakpoints.sm} {
 

    .nav-bar {
      grid-template-columns: 2fr 1fr;
      grid-template-rows: auto auto;
      grid-template-areas: 
        "logo menu"
        "search search";
      grid-row-gap: ${({ theme }) => theme.spacing["3"]};

      .quick-search {
        #quick-search-input {
          width: 100%;
        }
      }

      div.logo-container {
        img {
          width: 160px; /* Smaller logo on mobile devices */
        }
      }
    
      div.sign-and-cart {
        display: none;
      }

      div.hamburger-menu {
        display: block;
      }
    }

    

    .lower-nav {
      display: none;
    }
  }

`;

const Header = ({ sameElevate, showPhoneNumbers, showNavigations }) => {
  const { userState, authenticated, signoutHandler } = useAuth();

  const [displayResults, setDisplayResults] = useState(false);
  const [results, setResults] = useState(null);

  const [showMenu, setShowMenu] = useState(false);

  const { items, openCartModal } = useCart();

  function handleSearchFocus() {
    if (results !== null) {
      setDisplayResults(true);
    }
  }

  const handleSearchInput = debounce(async function (term) {
    if (term.length > 2) {
      let res = await useAPI.get(`/api/v1/tim-kiem?search=${term}&limit=10`);
      if (res.status == 200) {
        setResults({ books: res.data.books, total: res.data.total });
        setDisplayResults(true);
      } else {
        setDisplayResults(false);
      }
    } else {
      setDisplayResults(false);
    }
  }, 1000);

  const { asPath } = useRouter();
  useEffect(() => {
    setDisplayResults(false);
  }, [asPath]);

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
                  src={require("../../public/brand-images/logo.png")}
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
              onChange={(e) => handleSearchInput(e.currentTarget.value)}
              onFocus={handleSearchFocus}
            />
            {displayResults && (
              <div className="quick-search__results">
                <div className="quick-search__total">
                  <span>Đã tìm được {results.total} kết quả.</span>
                  {results.total > 0 && (
                    <span>
                      <Link href="/">
                        <a>Xem tất cả</a>
                      </Link>
                    </span>
                  )}
                </div>
                {results.books.length > 0 ? (
                  <ul className="quick-search__results-container">
                    {results.books.map((item) => (
                      <li className="quick-search__results-item">
                        <Link
                          href="/[category]/[subcategory]/[bookslug]"
                          as={`/${item.category.slug}/${item.subcategory.slug}/${item.slug}`}
                        >
                          <a>
                            <p>{item.title}</p>
                            <p>
                              <small>{item.author}</small>
                            </p>
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            )}
          </div>
          <div className="sign-and-cart">
            {authenticated && userState ? (
              <div className="hover__source linksDrop">
                <Link href="/me">
                  <a>Xin Chào, {userState.name} </a>
                </Link>

                <ul className="hover__target linksDrop">
                  <li className="linksDrop__item">
                    <Link href="/me">
                      <a>Tủ sách của tôi</a>
                    </Link>
                  </li>
                  <li className="linksDrop__item">
                    <Link href="/me/sach-muon-mua">
                      <a>Sách muốn mua</a>
                    </Link>
                  </li>
                  <li className="linksDrop__item">
                    <Link href="/me/kiem-tra-don-hang">
                      <a>Kiểm tra đơn hàng</a>
                    </Link>
                  </li>
                  <li className="linksDrop__item">
                    <button onClick={signoutHandler}>Đăng Xuất</button>
                  </li>
                </ul>
              </div>
            ) : (
              <div>
                <Link href="/dang-nhap">
                  <a className="sign-link">Đăng Nhập</a>
                </Link>
                <Link href="/dang-ky">
                  <a className="sign-link">Đăng Ký</a>
                </Link>
              </div>
            )}

            <Button
              label={`Giỏ Hàng (${items.length})`}
              onClick={openCartModal}
              primary
              icon={faShoppingBasket}
            />
          </div>
          <div className="hamburger-menu">
            <Button icon={faBars} onClick={() => setShowMenu(!showMenu)} />
            {showMenu && (
              <motion.aside
                className="hamburger-menu__panel"
                initial={{ x: -120 }}
                animate={{ x: 0 }}
                transition={{
                  stiffness: 100,
                }}
              >
                <div></div>
                <div className="hamburger-menu__panel-content">
                  <MenuItems />
                </div>
              </motion.aside>
            )}
            {showMenu && (
              <div
                className="hamburger-menu__mask"
                onClick={() => setShowMenu(false)}
              ></div>
            )}
          </div>
        </div>
      </div>
      {showNavigations && (
        <div className="row gray-bg">
          <nav className="lower-nav" id="begin-of-content">
            {links.map((prim, index) =>
              prim.group ? (
                <span className="hover__source" key={index}>
                  {prim.group}
                  <ul className="hover__target linksDrop">
                    {prim.items.map((item) => (
                      <li className="linksDrop__item" key={item.value}>
                        <Link href={`/${prim.groupVal}/${item.value}`}>
                          <a>{item.label}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </span>
              ) : (
                <Link href={prim.value} key={prim.value}>
                  <a>{prim.label}</a>
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </StyledHeader>
  );
};

Header.defaultProps = {
  sameElevate: false,
  showPhoneNumbers: true,
  showNavigations: true,
};

export default Header;
