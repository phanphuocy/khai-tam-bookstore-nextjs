import React, { useState, useEffect } from "react";
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
import useAPI from "../../hooks/useAPI";
import { useRouter } from "next/router";
import debounce from "lodash.debounce";

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
  const { userState, authenticated, signoutHandler } = useAuth();

  const [displayResults, setDisplayResults] = useState(false);
  const [results, setResults] = useState(null);

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
        </div>
      </div>
      <div className="row gray-bg">
        <nav className="lower-nav" id="begin-of-content">
          <a>Về Khai Tâm</a>
          <span className="hover__source">
            Vì Sao Chọn Khai Tâm?
            <ul className="hover__target linksDrop">
              <li className="linksDrop__item">
                <Link href="/vi-sao-chon-khai-tam/sen-bup-xin-tang-ban">
                  <a>Sen Búp Xin Tặng Bạn</a>
                </Link>
              </li>
              <li className="linksDrop__item">
                <Link href="/vi-sao-chon-khai-tam/bao-doc-sach-hay">
                  <a>Bao Đọc Sách Hay</a>
                </Link>
              </li>
            </ul>
          </span>
          <span className="hover__source">
            Hỗ Trợ Mua Hàng
            <ul className="hover__target linksDrop">
              <li className="linksDrop__item">
                <Link href="/ho-tro-mua-hang/huong-dan-mua-hang">
                  <a>Hướng Dẫn Mua Hàng</a>
                </Link>
              </li>
              <li className="linksDrop__item">
                <Link href="/ho-tro-mua-hang/phuong-thuc-thanh-toan">
                  <a>Phương Thức Thanh Toán</a>
                </Link>
              </li>
              <li className="linksDrop__item">
                <Link href="/ho-tro-mua-hang/phuong-thuc-giao-hang">
                  <a>Phương Thức Giao Hàng</a>
                </Link>
              </li>
              <li className="linksDrop__item">
                <Link href="/ho-tro-mua-hang/doi-tra-hang">
                  <a>Hướng Dẫn Đổi Trả Hàng</a>
                </Link>
              </li>
            </ul>
          </span>

          <Link href="/chia-se-sach-hay#begin-of-content">
            <a>Chia Sẻ Sách Hay</a>
          </Link>
        </nav>
      </div>
    </StyledHeader>
  );
};

Header.defaultProps = {
  sameElevate: false,
  showPhoneNumbers: true,
};

export default Header;
