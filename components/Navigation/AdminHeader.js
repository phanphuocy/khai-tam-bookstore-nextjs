import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.green["100"]};
  padding: ${({ theme }) => `${theme.spacing["4"]} 0`};

  .logo {
    padding: ${({ theme }) => `0 ${theme.spacing[8]}`};

    .logo__logotype {
      font-weight: 700;
      color: ${({ theme }) => theme.colors.gray["900"]};
    }
  }
`;

const AdminHeader = () => {
  return (
    <StyledHeader>
      <div className="logo">
        <p className="logo__logotype">Khai Tâm Bookstore</p>
      </div>
    </StyledHeader>
  );
};

export default AdminHeader;
