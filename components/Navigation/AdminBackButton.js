import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const StyledContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing["2"]};
  display: block;

  button {
    ${({ theme }) => theme.borderRadius["rounded"]};
    color: ${({ theme }) => theme.colors.gray["400"]};
    padding: ${({ theme }) => `${theme.spacing["3"]} ${theme.spacing["2"]}`};
    display: flex;
    align-items: center;

    svg {
      margin-right: ${({ theme }) => theme.spacing["1"]};
    }

    &:hover,
    &:active {
      background-color: ${({ theme }) => theme.colors.gray["700"]};
      color: ${({ theme }) => theme.colors.gray["200"]};
    }
  }
`;

const AdminBackButton = () => {
  let router = useRouter();

  return (
    <StyledContainer>
      <button onClick={() => router.back()}>
        <FontAwesomeIcon icon={faChevronLeft} />
        Quay Lại
      </button>
    </StyledContainer>
  );
};

export default AdminBackButton;
