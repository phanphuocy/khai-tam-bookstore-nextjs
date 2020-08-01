import React, { useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../../contexts/userContext";
import ProtectRoute from "../../HOC/protectedRoute";
import UserLayout from "../../components/Layout/UserLayout";
import Skeleton from "react-loading-skeleton";
import Button from "../../components/atomics/Button";
import statuses, { statusName } from "../../constants/statuses";

const StyledPage = styled.main`
  .main__heading {
    border-bottom: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
    padding: ${({ theme }) =>
      `${theme.spacing["1"]} ${theme.spacing["4"]} ${theme.spacing["3"]}`};
  }
  .main__content {
    padding: ${({ theme }) => `${theme.spacing["2"]} ${theme.spacing["4"]}`};
  }

  .orderRow {
    ${({ theme }) => theme.borderRadius["rounded"]};
    border: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
    margin-bottom: ${({ theme }) => theme.spacing["3"]};

    .orderRow__heading {
      background-color: ${({ theme }) => theme.colors.gray["900"]};
      padding: ${({ theme }) =>
        `${theme.spacing["3"]} ${theme.spacing["4"]} ${theme.spacing["2"]}`};
      border-bottom: ${({ theme }) =>
        `1px solid ${theme.colors.border.default}`};
      .orderRow__heading_dateOrdered {
        strong {
          margin-right: ${({ theme }) => theme.spacing["2"]};
        }
      }
    }
    .orderRow__content {
      display: flex;
      padding: ${({ theme }) =>
        `${theme.spacing["2"]} ${theme.spacing["4"]} ${theme.spacing["3"]}`};

      .orderRow__content-items {
        flex-basis: 70%;
        border-right: ${({ theme }) =>
          `1px solid ${theme.colors.border.default}`};
        margin-right: ${({ theme }) => theme.spacing["4"]};
      }
      .orderRow__content__pricing {
        flex-basis: 30%;
      }
    }
    .orderRow__actions {
      padding: ${({ theme }) =>
        `${theme.spacing["3"]} ${theme.spacing["4"]} ${theme.spacing["2"]}`};
      display: flex;
      justify-content: flex-end;
    }
  }
`;

const MePage = () => {
  const { userState, loading } = useAuth();

  if (loading) {
    return <h1>Loading</h1>;
  }

  let options = {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timeZone: "UTC",
  };

  const Badge = styled.span`
    ${({ theme }) => theme.borderRadius["rounded-full"]};
    background-color: ${(props) => props.theme.colors.green["500"]};
    color: white;
    padding: ${({ theme }) => `${theme.spacing["1"]} ${theme.spacing["3"]}`};
  `;

  const StatusBadge = ({ status }) => (
    <Badge className="statusBadge">{statusName[status]}</Badge>
  );

  return (
    <UserLayout>
      <StyledPage>
        <div className="main__heading">
          <p>Bạn đang có {userState.orders.length} đơn hàng</p>
        </div>
        <div className="main__content content">
          <ul className="content__items">
            {userState.orders.length > 0 &&
              userState.orders.map((order) => (
                <li className="orderRow">
                  <div className="orderRow__heading">
                    <p className="orderRow__heading_dateOrdered">
                      <strong>
                        {new Intl.DateTimeFormat("vi-VN", options).format(
                          new Date(order.dateOrdered)
                        )}
                      </strong>
                      <StatusBadge status={order.status} />
                    </p>
                  </div>
                  <div className="orderRow__content">
                    <div className="orderRow__content-items">
                      <ul>
                        {order.items.map((book) => (
                          <li className="book">
                            <p>{book.title}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="orderRow__content-pricing">
                      <table>
                        <tr>
                          <td>Tạm Tính</td>
                          <td>
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(order.prices.discountedPrice)}
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                  <div className="orderRow__actions">
                    <Button label="Hủy Đơn Hàng" />
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </StyledPage>
    </UserLayout>
  );
};

export default ProtectRoute(MePage);
