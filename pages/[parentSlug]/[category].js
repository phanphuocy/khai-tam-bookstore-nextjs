import React from "react";
import styled from "styled-components";
import Categories from "../../components/Homepage/FeaturedSection/Categories";
import 

const StyledPage = styled.main`
  display: grid;

  & > div {
    min-height: 2rem;
  }

  .categories {
    grid-area: categories;
  }
  .content {
    grid-area: content;
  }
  .filter {
    grid-area: filter;
  }

  ${({ theme }) => theme.breakpoints.laptop} {
    grid-template-columns: 1fr 3fr;
    grid-template-rows: repeat(2, auto);
    grid-template-areas:
      "categories content"
      "filter content";
  }
`;

const CategoryPage = () => {
  return (
    <StyledPage>
      <div className="categories"></div>
      <div className="content"></div>
      <div className="filter"></div>
    </StyledPage>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { ... } } // See the "paths" section below
    ],
    fallback: false
  };
};


export default CategoryPage;
