import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Link from "next/link";
import { motion } from "framer-motion";

const StyledList = styled.ul`
  padding: ${({ theme }) => theme.spacing["4"]};
  display: flex;
  flex-direction: column;

  .separate-line {
    height: 1px;
    width: 50%;
    background-color: ${({ theme }) => theme.colors.border.default};
    margin-top: ${({ theme }) => theme.spacing["3"]};
    margin-bottom: ${({ theme }) => theme.spacing["3"]};
  }

  .book {
    display: flex;
    background-color: ${({ theme }) => theme.colors.gray[900]};
    ${({ theme }) => theme.borderRadius["rounded-lg"]};
    padding: ${({ theme }) => `${theme.spacing["4"]} ${theme.spacing["6"]}`};
    margin-bottom: ${({ theme }) => theme.spacing["4"]};

    .book__cover {
      flex-basis: 15%;
      flex-grow: 0;
      flex-shrink: 0;
      max-width: 200px;

      img.book__cover-image {
        ${({ theme }) => theme.shadow.base};
        width: "100%";
      }
    }

    .book__info {
      padding: ${({ theme }) => `${theme.spacing["4"]} ${theme.spacing["3"]}`};
      display: flex;
      flex-direction: column;

      .book__info-title {
        font-family: ${({ theme }) => theme.fonts.title};
        font-size: ${({ theme }) => theme.fontSizes.md};
        font-weight: 600;
      }
      .book-info-author {
        font-size: ${({ theme }) => theme.fontSizes.sm};
      }
      .book__info-desc {
        font-size: ${({ theme }) => theme.fontSizes.sm};
      }
    }
  }
`;

const BooksList = ({ books }) => {
  return (
    <StyledList>
      {books.map((book, index) => (
        <motion.li
          className="book"
          key={book.slug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.2, stiffness: 100, duration: 0.5 }}
        >
          <div className="book__cover">
            <motion.img
              initial={{ filter: "grayscale(0.8)" }}
              animate={{ filter: "grayscale(0)" }}
              transition={{
                stiffness: 100,
                duration: 1,
                delay: 0.5,
              }}
              className="book__cover-image"
              src={`https://khaitam.com${book.cover}`}
              alt="Book cover"
              width="100%"
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
            <div className="separate-line"></div>
            {/* <p className="prices-container">
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
            </p> */}
            <div>
              {book.introduction && book.introduction.bookIntroduction ? (
                <p className="book__info-desc">
                  {book.introduction.bookIntroduction.concat("...")}
                </p>
              ) : (
                <p className="book__info-desc">No</p>
              )}
            </div>
          </div>
        </motion.li>
      ))}
    </StyledList>
  );
};

BooksList.propTypes = {
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

export default BooksList;
