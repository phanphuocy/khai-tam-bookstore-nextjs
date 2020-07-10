import React from "react";
import styled from "styled-components";
import CategoriesNav from "./CategoriesNav";

const StyledLayout = styled.main`
  ${({ theme }) => theme.maxWidths.desktop};
  display: grid;

  .categories {
    grid-area: categories;
    background-color: white;
  }

  .content {
    grid-area: content;
  }

  .filter {
    grid-area: filter;
  }

  ${({ theme }) => theme.breakpoints.laptop} {
    grid-template-columns: 3fr 13fr;
    grid-column-gap: ${({ theme }) => theme.spacing["8"]};
    grid-template-rows: repeat(2, auto);
    grid-template-areas:
      "categories content"
      "filter content";
  }
`;

const ThreeSectionsLayout = ({ children }) => {
  return (
    <StyledLayout>
      <div className="categories">
        <CategoriesNav />
      </div>
      <div className="content">{children}</div>
      <div className="filters"></div>
    </StyledLayout>
  );
};

export default ThreeSectionsLayout;
