import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import styled from "styled-components";

const StyledGrid = styled.ul`
  padding: ${({ theme }) => theme.spacing["4"]};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: ${({ theme }) => theme.spacing["3"]};
  grid-template-rows: repeat(auto, auto);
  grid-row-gap: ${({ theme }) => theme.spacing["4"]};

  .book {
    background-color: ${({ theme }) => theme.colors.gray[900]};
    ${({ theme }) => theme.borderRadius["rounded-lg"]};
    padding: ${({ theme }) => `${theme.spacing["8"]} ${theme.spacing["6"]}`};

    .book__cover {
      display: flex;
      justify-content: center;
      padding-bottom: ${({ theme }) => theme.spacing["4"]};

      .book__cover-image {
        ${({ theme }) => theme.shadow.base};
        height: 240px;
        max-height: 240px;
        max-width: 100%;
        display: block;
        object-fit: contain;
      }
    }

    .book__info {
      .book__info-title {
        font-weight: 600;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        /* font-family: ${({ theme }) => theme.fonts.serif}; */
        font-size: ${({ theme }) => theme.fontSizes.base};
        margin-bottom: ${({ theme }) => theme.spacing["1"]};
      }
      .book__info-author {
        color: ${({ theme }) => theme.colors.gray["300"]};
        font-size: ${({ theme }) => theme.fontSizes.sm};
        margin-bottom: ${({ theme }) => theme.spacing["2"]};
      }
    }

    .prices-container {
      .discounted-price {
        font-weight: 800;
        font-size: ${({ theme }) => theme.fontSizes.md};
        color: ${({ theme }) => theme.colors.green["300"]};
      }

      .discounted-rate {
        margin-left: ${({ theme }) => theme.spacing["2"]};
        color: ${({ theme }) => theme.colors.green["500"]};
      }
    }
  }
`;

const BooksGrid = ({ books }) => {
  return (
    <StyledGrid>
      {books.map((book) => (
        <li className="book" key={book.slug}>
          <div className="book__cover">
            <img
              className="book__cover-image"
              src={`https://khaitam.com${book.cover}`}
              alt="Book cover"
            />
          </div>
          <div className="book__info">
            <Link
              href="/[categories]/[subcategories]/[bookslug]"
              as={`/${book.category.slug}/${book.subcategory.slug}/${book.slug}`}
            >
              <a>
                <p className="book__info-title">{book.title}</p>
                <p className="book__info-author">{book.author}</p>
              </a>
            </Link>
          </div>

          <p className="prices-container">
            <span className="discounted-price">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(book.prices.discounted)}
            </span>
            {book.prices.discountedRate && (
              <span className="discounted-rate">
                {`(-${book.prices.discountedRate}%)`}
              </span>
            )}
          </p>
        </li>
      ))}
    </StyledGrid>
  );
};

BooksGrid.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      prices: PropTypes.shape({
        discounted: PropTypes.number.isRequired,
        discountedRate: PropTypes.number,
      }).isRequired,
      category: PropTypes.shape({
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
      }).isRequired,
      subcategory: PropTypes.shape({
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default BooksGrid;
