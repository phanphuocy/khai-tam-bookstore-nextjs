import React, { useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../../contexts/userContext";
import ProtectRoute from "../../HOC/protectedRoute";
import UserLayout from "../../components/Layout/UserLayout";

const StyledPage = styled.main``;

const MePage = () => {
  return (
    <UserLayout>
      <StyledPage>
        <h1>KIEM TRA DON HANG</h1>
      </StyledPage>
    </UserLayout>
  );
};

export default ProtectRoute(MePage);
