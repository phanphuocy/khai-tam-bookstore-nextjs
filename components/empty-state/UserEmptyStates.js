import React from "react";
import styled from "styled-components";

const Styled = styled.div`
  padding: ${({ theme }) => `${theme.spacing["8"]} ${theme.spacing["8"]}`};
  display: flex;
  flex-direction: column;
  align-items: center;
  .main__empty-illustration {
    padding: ${({ theme }) => `${theme.spacing["4"]} 0`};
    max-width: 10rem;
    margin-bottom: ${({ theme }) => theme.spacing["4"]};
  }
`;

const UserEmptyStates = ({ type = "empty-cart" }) => {
  switch (type) {
    case "empty-cart":
      return (
        <Styled>
          <div className="main__empty-illustration">
            <img
              src={require("../../public/illustrations/empty-shelf.svg")}
              alt="Illustration for empty shelf"
              width="100%"
            />
          </div>
          <h4>Tủ Sách Đang Trống</h4>
          <p>Danh sách sẽ được cập nhập sau khi bạn đặt đơn hàng đầu tiên.</p>
          <p></p>
        </Styled>
      );
    case "empty-wishlist":
      return (
        <Styled>
          <div className="main__empty-illustration">
            <img
              src={require("../../public/illustrations/basket.svg")}
              alt="Illustration for empty shelf"
              width="100%"
            />
          </div>
          <h4>Danh Sách Đang Trống</h4>
          <p>
            Danh sách giúp bạn quản lí sách muốn mua tiện lợi hơn cho đợt mua
            hàng kế tiếp.
          </p>
        </Styled>
      );
    default:
      return <Styled></Styled>;
  }
};

export default UserEmptyStates;
