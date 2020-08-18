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
import { useRouter } from "next/router";
import links from "../../constants/header-links";
import { motion } from "framer-motion";
import MenuItems from "./MenuItems";
import SearchBar from "./SearchBar";
import Logo from "./Logo";

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
    grid-column-gap:${({ theme }) => theme.spacing["4"]};
    grid-template-areas: "logo search cart";


    .logo-container {
      grid-area: logo;
    }
    .quick-search {
      grid-area: search;
      
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

const QuickContactsRow = () => (
  <div className="row">
    <div className="quick-contacts-bar">
      <span>HOTLINE</span>
      <FontAwesomeIcon icon={faCaretSquareRight} />
      <a href="tel:028-7301-9778">028.7301.9778</a>
      <span className="spacer"> - </span>
      <a href="tel:028-7301-9777">028.7301.9777</a>
    </div>
  </div>
);

const NavigationRow = ({ links }) => (
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
);

const Header = ({ sameElevate, showPhoneNumbers, showNavigations }) => {
  const { userState, authenticated, signoutHandler } = useAuth();

  const [showMenu, setShowMenu] = useState(false);

  const { items, openCartModal } = useCart();

  // const { asPath } = useRouter();

  // useEffect(() => {
  //   // setDisplayResults(false);
  // }, [asPath]);

  return (
    <StyledHeader sameElevate={sameElevate}>
      {showPhoneNumbers && <QuickContactsRow />}
      <div className="row">
        <div className="nav-bar">
          <div className="logo-container">
            <Logo />
          </div>
          <div className="quick-search">
            <SearchBar />
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
      {showNavigations && <NavigationRow links={links} />}
    </StyledHeader>
  );
};

Header.defaultProps = {
  sameElevate: false,
  showPhoneNumbers: true,
  showNavigations: true,
};

export default Header;
