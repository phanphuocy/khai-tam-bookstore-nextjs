import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Button from "../atomics/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const StyledContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing["3"]};
  display: block;
`;

const AdminBackButton = () => {
  let router = useRouter();

  return (
    <StyledContainer>
      <Button
        onClick={() => router.back()}
        icon={faChevronLeft}
        label="Quay Lại"
      />
    </StyledContainer>
  );
};

export default AdminBackButton;
