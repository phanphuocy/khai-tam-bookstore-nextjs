import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useCart } from "../../contexts/cartContext";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const StyledPanelsContainer = styled.div`
    .panel {
        .panel__heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: ${({ theme }) =>
            `${theme.spacing["2"]} ${theme.spacing["2"]} 0`};
          padding: ${({ theme }) =>
            `${theme.spacing["4"]} ${theme.spacing["4"]}`};
          border-bottom: ${({ theme }) =>
            `1px solid ${theme.colors.border.default}`};
        }

        .panel__content {
          padding: ${({ theme }) =>
            `${theme.spacing["6"]} ${theme.spacing["6"]}`};

          .cart__items,
          .cart__billing {
            border-bottom: ${({ theme }) =>
              `1px solid ${theme.colors.border.default}`};
          }

          .cart__billing {
            text-align: right;

            ul {
              padding: ${({ theme }) => `${theme.spacing["2"]} 0`};
              display: flex;
              flex-direction: column;

              li {
                display: inline-flex;
                justify-content: flex-end;
                padding: ${({ theme }) => `${theme.spacing["2"]} 0`};
                /* border-bottom: ${({ theme }) =>
                  `1px solid ${theme.colors.border.default}`}; */
              }
            }
          }

          .bookRow {
            display: flex;
            align-items: center;
            margin-bottom: ${({ theme }) => theme.spacing["2"]};
            .bookRow__cover {
              width: 5rem;
              max-height: 6.5rem;
              object-fit: contain;
              display: block;
              margin-right: ${({ theme }) => theme.spacing["2"]};
            }
          }

          .groupInfo__item {
            margin-bottom: ${({ theme }) => theme.spacing["3"]};
          }
        }
      }
`;

const Sidebar = ({ requireDeliveryInfo, requireCartInfo }) => {
  const { items, prices, loading } = useCart();

  const [deliveryInfo, setDeliveryInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    title: "",
  });

  const router = useRouter();

  useEffect(() => {
    // Check if user has already entered delivery infos, else go back.
    let lsDeliveryInfo = JSON.parse(localStorage.getItem("deliveryInfo"));
    if (!lsDeliveryInfo && requireDeliveryInfo) {
      router.push("/thanh-toan/dia-chi");
      // } else if (
      //   !lsDeliveryInfo.title ||
      //   !lsDeliveryInfo.name ||
      //   !lsDeliveryInfo.email ||
      //   !lsDeliveryInfo.phone ||
      //   !lsDeliveryInfo.fullAddress
      // ) {
      //   router.push("/thanh-toan/dia-chi");
    } else {
      setDeliveryInfo(lsDeliveryInfo);
    }

    // Check if user has select items
    let lsCartItems = JSON.parse(localStorage.getItem("cartItems"));

    if (lsCartItems.length === 0 && requireCartInfo) {
      console.log("ABC", items.length);

      router.push("/");
    }
  }, [items, loading]);

  return (
    <StyledPanelsContainer>
      {requireCartInfo && (
        <div className="panel">
          <div className="panel__heading">
            <h6>Thông Tin Đơn Hàng</h6>
            <button>
              <FontAwesomeIcon icon={faEdit} />
              Sửa
            </button>
          </div>
          <div className="panel__content">
            <div className="cart__items">
              <ul>
                {items.map((item) => (
                  <li className="bookRow">
                    <img
                      className="bookRow__cover"
                      src={`http://khaitam.com${item.cover}`}
                      alt={`Book cover of ${item.title}`}
                      width="100%"
                      height="100%"
                    />
                    {item.nbOfItems} x {item.title}
                  </li>
                ))}
              </ul>
            </div>
            <div className="cart__billing">
              <ul>
                <li>
                  <span>Tạm Tính: </span>
                  <strong>{prices.discountedPrice}</strong>
                </li>
                <li>
                  <span>Phí Vận Chuyển: </span>
                  <strong>0</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      {requireDeliveryInfo && (
        <div className="panel">
          <div className="panel__heading">
            <h6>Địa Chỉ Đơn Hàng</h6>
            <button>
              <FontAwesomeIcon icon={faEdit} />
              Sửa
            </button>
          </div>
          <div className="panel__content">
            <ul className="groupInfo">
              <li className="groupInfo__item">
                <p>
                  <span>Người Nhận: {deliveryInfo.title} </span>
                  <strong>{deliveryInfo.name}</strong>
                </p>
              </li>
              <li className="groupInfo__item">
                <p>
                  <span>Email: </span>
                  <strong>{deliveryInfo.email}</strong>
                </p>
              </li>
              <li className="groupInfo__item">
                <p>
                  <span>SĐT: </span>
                  <strong>{deliveryInfo.phone}</strong>
                </p>
              </li>
              <li className="groupInfo__item">
                <p>
                  <span>Địa Chỉ: </span>
                  <strong>{deliveryInfo.fullAddress}</strong>
                </p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </StyledPanelsContainer>
  );
};

Sidebar.defaultProps = {
  requireCartInfo: true,
  requireDeliveryInfo: false,
};

export default Sidebar;
