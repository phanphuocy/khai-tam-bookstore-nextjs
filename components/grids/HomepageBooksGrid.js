import React from "react";
import styled from "styled-components";
import { urlFor } from "../../database/sanity";

const StyledContainer = styled.div`
  ${({ theme }) => theme.maxWidths.desktop};
  padding: ${({ theme }) => `0 ${theme.spacing["4"]}`};

  .title {
    display: flex;
    justify-content: center;
    padding-bottom: ${({ theme }) => theme.spacing["2"]};
    border-bottom: ${({ theme }) => `1px solid ${theme.colors.neutral["400"]}`};
    margin-bottom: ${({ theme }) => theme.spacing["3"]};

    .title__text {
      font-family: ${({ theme }) => theme.fonts.serif};
      color: brown;
    }
  }

  ul {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-column-gap: ${({ theme }) => theme.spacing["3"]};
    grid-template-rows: 1fr;
  }

  .book {
    .book__cover {
      width: 100%;
      height: 16rem; /* =240px */
      display: flex;
      justify-content: center;
      padding: ${({ theme }) => theme.spacing["2"]};
    }
    .book__title {
      margin-top: ${({ theme }) => theme.spacing["1"]};
    }
    .book__author {
      margin-top: ${({ theme }) => theme.spacing["1"]};
      font-size: ${({ theme }) => theme.fontSizes.sm};
    }
  }

  ${({ theme }) => theme.breakpoints.sm} {
    padding: 0;

    ul {
      width: 100%;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: auto auto auto;
      grid-column-gap: ${({ theme }) => theme.spacing["2"]};
      grid-row-gap: ${({ theme }) => theme.spacing["3"]};
    }

    .book {
      .book__cover {
        height: 12rem;
      }
      .book__title {
        font-size: ${({ theme }) => theme.fontSizes.sm};
        text-align: center;
      }
      .book__author {
        text-align: center;
      }
    }
  }
`;

const HomepageBooksGrid = ({ books, title = "Title" }) => {
  return (
    <StyledContainer>
      <div className="title">
        <h3 className="title__text">{title}</h3>
      </div>
      <ul>
        {books.map((book) => (
          <li key={book.slug} className="book">
            <div className="book__cover">
              <img
                className="book__cover-image"
                src={urlFor(book.image).height(240).format("webp")}
                height="100%"
              />
            </div>
            <h6 className="book__title">{book.title}</h6>
            <p className="book__author">{book.author}</p>
          </li>
        ))}
      </ul>
    </StyledContainer>
  );
};

export default HomepageBooksGrid;
