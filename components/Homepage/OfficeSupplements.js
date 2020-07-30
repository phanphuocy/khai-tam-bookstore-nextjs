import React from "react";
import styled from "styled-components";

const StyledSection = styled.section`
  ${({ theme }) => theme.maxWidths.desktop};
`;

const OfficeSupplements = () => {
  return (
    <StyledSection>
      <a>
        <picture>
          <source
            srcSet={require("../../public/images/vhp.jpg?webp")}
            type="image/webp"
          />
          <img src={require("../../public/images/vhp.jpg")} width="100%" />
        </picture>
      </a>
    </StyledSection>
  );
};

export default OfficeSupplements;
