import React from "react";
import AdminLayout from "../../../components/Layout/AdminLayout";
import styled from "styled-components";

import connectMongoose from "../../../database/initMongoose";
import Order from "../../../database/orderModel";
import { useRouter } from "next/router";

import AdminBackButton from "../../../components/Navigation/AdminBackButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";

const StyledPage = styled.div`
  ${({ theme }) => theme.maxWidths.laptop};

  .panel {
    ${({ theme }) => theme.shadow.xs};
    border: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
    ${({ theme }) => theme.borderRadius["rounded"]};
    background-color: white;
    min-height: 5rem;
    margin-bottom: ${({ theme }) => theme.spacing["4"]};

    .panel__heading {
      padding: ${({ theme }) => `${theme.spacing["4"]} ${theme.spacing["6"]}`};
      border-bottom: ${({ theme }) =>
        `1px solid ${theme.colors.border.default}`};

      .panel__heading-title {
        font-weight: 600;
        color: ${({ theme }) => theme.colors.gray["300"]};
      }

      .panel__heading-subtitle {
        margin-top: ${({ theme }) => theme.spacing["2"]};
        font-family: ${({ theme }) => theme.fonts.serif};
        color: ${({ theme }) => theme.colors.gray["300"]};
      }
    }

    .panel__billing {
      border-top: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
      padding: ${({ theme }) => `${theme.spacing["4"]} ${theme.spacing["6"]}`};

      p span:nth-child(2) {
        font-weight: 600;
      }
    }
  }

  .two-columns {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-column-gap: ${({ theme }) => theme.spacing["8"]};
  }

  .top-heading {
    padding: ${({ theme }) => `${theme.spacing["4"]} 0`};

    h3.top-heading__id-and-date {
      span:nth-child(1) {
        font-weight: 600;
        margin-right: ${({ theme }) => theme.spacing["4"]};
      }
      span:nth-child(2) {
        font-size: 1rem;
      }
    }
  }

  .items {
    .items__item {
      border: 1px solid green;
      padding: ${({ theme }) => `${theme.spacing["4"]} ${theme.spacing["6"]}`};
    }
  }
`;

const OrderSinglePage = ({ order }) => {
  const router = useRouter();
  const {
    _id,
    dateOrdered,
    withUser,
    delivery,
    user,
    payment,
    items,
    prices,
  } = order;
  var intlOption = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    dayPeriod: "short",
  };
  const intlDate = new Intl.DateTimeFormat("vi-VN", intlOption).format(
    new Date(dateOrdered)
  );
  return (
    <AdminLayout useDefaultHeader={false}>
      <StyledPage>
        <div className="top-navigation"></div>
        <div className="top-heading">
          <AdminBackButton />
          <h3 className="top-heading__id-and-date">
            <span>
              {"#" +
                _id.substring(0, 6) +
                "..." +
                _id.substring(_id.length - 6)}
            </span>
            <span>{intlDate}</span>
          </h3>
        </div>
        <div className="two-columns">
          <div className="main-col">
            <section className="items panel">
              <div className="panel__heading">
                <h6 className="panel__heading-title">Giỏ Hàng</h6>
              </div>
              <div className="panel__items">
                <ul className="items">
                  {items.map((item) => (
                    <li className="items__item" key={item.slug}>
                      <p>{item.title}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="panel__billing">
                <p>
                  <span>Tạm Tính: </span>
                  <span>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(prices.discountedPrice)}
                  </span>
                </p>
              </div>
            </section>
            <section className="payment panel">
              <div className="panel__heading">
                <h6 className="panel__heading-title">Thanh Toán</h6>
              </div>
            </section>
            <section className="delivery panel">
              <div className="panel__heading">
                <h6 className="panel__heading-title">Giao Hàng</h6>
              </div>
            </section>
          </div>
          <div className="side-col">
            <section className="note panel">
              <div className="panel__heading">
                <h6 className="panel__heading-title">Lời Nhắn</h6>
              </div>
            </section>
            <section className="customer panel">
              <div className="panel__heading">
                <h6 className="panel__heading-title">Khách Hàng</h6>
                <p className="panel__heading-subtitle">
                  {withUser ? user.username : "Khách"}
                </p>
              </div>
            </section>
          </div>
        </div>
      </StyledPage>
    </AdminLayout>
  );
};

export async function getServerSideProps(context) {
  try {
    // console.log(context.params);
    context.params.id = "5f1657636d893d455738cc2c";

    await connectMongoose();

    let order = await Order.findById(context.params.id);

    if (!order) {
      return { props: {} };
    }
    console.log("HAS ORDER", order);

    return {
      props: { order: JSON.parse(JSON.stringify(order)) },
    };
  } catch (error) {
    console.log(error);
  }
}

export default OrderSinglePage;
