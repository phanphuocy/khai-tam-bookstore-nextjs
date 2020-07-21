import React, { useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../../contexts/userContext";
import ProtectRoute from "../../HOC/protectedRoute";
import UserLayout from "../../components/Layout/UserLayout";
import Skeleton from "react-loading-skeleton";

const StyledPage = styled.main`
  .orderRow {
    border: 1px solid rgba(0, 255, 0, 0.5);
    margin-bottom: ${({ theme }) => theme.spacing["3"]};

    .orderRow__heading {
      padding: ${({ theme }) =>
        `${theme.spacing["3"]} ${theme.spacing["4"]} ${theme.spacing["2"]}`};
      border-bottom: ${({ theme }) =>
        `1px solid ${theme.colors.border.default}`};
    }
    .orderRow__content {
      padding: ${({ theme }) =>
        `${theme.spacing["2"]} ${theme.spacing["4"]} ${theme.spacing["3"]}`};
    }
  }
`;

const MePage = () => {
  const { userState, loading } = useAuth();

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <UserLayout>
      <StyledPage>
        <h1>KIEM TRA DON HANG</h1>
        <ul>
          {userState.orders.length > 0 &&
            userState.orders.map((order) => {
              let dateOrdered = new Date(order.dateOrdered);
              let day = dateOrdered.getDay() + 1;
              let month = dateOrdered.getMonth() + 1;
              return (
                <li className="orderRow">
                  <div className="orderRow__heading">
                    <p className="orderRow__heading_dateOrdered">
                      <strong>
                        {"Thứ " +
                          day +
                          ", " +
                          dateOrdered.getDate() +
                          " tháng " +
                          month +
                          ", " +
                          dateOrdered.getFullYear()}
                      </strong>
                    </p>
                  </div>
                  <div className="orderRow__content">
                    <ul>
                      {order.items.map((book) => (
                        <li className="book">
                          <p>{book.title}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
        </ul>
      </StyledPage>
    </UserLayout>
  );
};

export default ProtectRoute(MePage);
