import React from "react";
import styled from "styled-components";

const MainAsideLayout = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-column-gap: ${({ theme }) => theme.spacing["4"]};
`;

const MainColumn = styled.div``;

const AsideColumn = styled.div``;

export { MainAsideLayout, MainColumn, AsideColumn };
