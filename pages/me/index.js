import React, { useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../../contexts/userContext";
import ProtectRoute from "../../HOC/protectedRoute";
import UserLayout from "../../components/Layout/UserLayout";
import UserEmptyStates from "../../components/empty-state/UserEmptyStates";

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
`;

const MePage = () => {
  const { userState, authenticated, loading } = useAuth();
  if (loading || !userState.shelf || userState.shelf.length <= 0) {
    return (
      <UserLayout>
        <StyledPage>
          <UserEmptyStates type="empty-cart" />
        </StyledPage>
      </UserLayout>
    );
  }
  return (
    <UserLayout>
      <StyledPage>
        <div className="main__heading"></div>
        <div className="main__content"></div>
      </StyledPage>
    </UserLayout>
  );
};

export default ProtectRoute(MePage);
