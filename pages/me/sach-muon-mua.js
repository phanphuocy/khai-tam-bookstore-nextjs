import React, { useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../../contexts/userContext";
import ProtectRoute from "../../HOC/protectedRoute";
import UserLayout from "../../components/Layout/UserLayout";
import UserEmptyStates from "../../components/empty-state/UserEmptyStates";
import BookGrid from "../../components/grids/BooksGrid";

const StyledPage = styled.main`
  .main__empty {
    padding: ${({ theme }) => `${theme.spacing["8"]} ${theme.spacing["8"]}`};
    display: flex;
    flex-direction: column;
    align-items: center;
    .main__empty-illustration {
      padding: ${({ theme }) => `${theme.spacing["4"]} 0`};
      max-width: 10rem;
    }
  }

  .main__heading {
    border-bottom: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
    padding: ${({ theme }) =>
      `${theme.spacing["1"]} ${theme.spacing["4"]} ${theme.spacing["3"]}`};
  }
`;

const WishListPage = () => {
  const { userState, authenticated, loading } = useAuth();

  if (!authenticated) {
    return <div>EMPTY</div>;
  }

  if (loading || !userState.wishlist || userState.wishlist.length <= 0) {
    return (
      <UserLayout>
        <StyledPage>
          <UserEmptyStates type="empty-wishlist" />
        </StyledPage>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <StyledPage>
        <div className="main__heading">
          <p>Bạn đã lưu {userState.wishlist.length} sản phẩm</p>
        </div>
        <div className="main__content">
          <BookGrid books={userState.wishlist} view="chi-tiet" />
        </div>
      </StyledPage>
    </UserLayout>
  );
};

export default ProtectRoute(WishListPage);
