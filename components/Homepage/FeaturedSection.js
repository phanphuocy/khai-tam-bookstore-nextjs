import React from "react";
import styled from "styled-components";
import Categories from "../Categories/CategoriesNav";
import SlideShow from "./FeaturedSection/SlideShow";

const StyledSection = styled.section`
  ${({ theme }) => theme.maxWidths.desktop};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: ${({ theme }) => theme.spacing["3"]};
  grid-template-rows: repeat(3, auto);
  grid-row-gap: ${({ theme }) => theme.spacing["2"]};
  grid-template-areas:
    "categories banner banner banner"
    "categories collection published recommend"
    "categories . . .";

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

  ${({ theme }) => theme.breakpoints.sm} {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      "banner banner"
      "collection published"
      "recommend .";
    grid-column-gap: ${({ theme }) => theme.spacing["1"]};
    grid-row-gap: ${({ theme }) => theme.spacing["1"]};

    /* Styling */
    padding: ${({ theme }) => `0 ${theme.spacing["2"]}`};

    .categories {
      display: none;
    }
  }
`;

const FeaturedSection = ({ banners }) => {
  return (
    <StyledSection>
      <div className="categories container">
        <Categories />
      </div>
      <div className="banner container">
        <SlideShow data={banners} />
      </div>
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
