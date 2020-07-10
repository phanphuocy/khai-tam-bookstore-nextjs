import React from "react";
import styled from "styled-components";
import Categories from "../Categories/CategoriesNav";

const StyledSection = styled.section`
  ${({ theme }) => theme.maxWidths.desktop};
  display: flex;
  flex-direction: column;

  padding: ${({ theme }) => `0 ${theme.spacing["4"]}`};

  .container {
    ${({ theme }) => theme.borderRadius["rounded"]};
    background-color: white;
    border: 1px solid lightgray;
    min-height: 4rem;
  }

  .categories {
    grid-area: categories;
  }
  .banner {
    grid-area: banner;
  }
  .khaitam-collection {
    grid-area: collection;
  }
  .khaitam-published {
    grid-area: published;
  }
  .khaitam-recommend {
    grid-area: recommend;
  }

  ${({ theme }) => theme.breakpoints.laptop} {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: ${({ theme }) => theme.spacing["3"]};
    grid-template-rows: repeat(3, auto);
    grid-row-gap: ${({ theme }) => theme.spacing["2"]};
    grid-template-areas:
      "categories banner banner banner"
      "categories collection published recommend"
      "categories . . .";
  }
`;

const FeaturedSection = () => {
  return (
    <StyledSection>
      <div className="categories container">
        <Categories />
      </div>
      <div className="banner container"></div>
      <div className="khaitam-collections container">
        <img
          src="/images/placeholder-image.png"
          alt="Placeholder"
          width="100%"
          height="100%"
        />
      </div>
      <div className="khaitam-published container">
        <img
          src="/images/placeholder-image.png"
          alt="Placeholder"
          width="100%"
          height="100%"
        />
      </div>
      <div className="khaitam-recommend container">
        <img
          src="/images/placeholder-image.png"
          alt="Placeholder"
          width="100%"
          height="100%"
        />
      </div>
    </StyledSection>
  );
};

export default FeaturedSection;
