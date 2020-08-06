import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useCart } from "../../contexts/cartContext";
import Skeleton from "react-loading-skeleton";

const StyledGrid = styled.ul`
  padding: ${({ theme }) => theme.spacing["4"]};
  background-color: white;
  display: grid;
  grid-template-columns: ${(props) =>
    props.detail ? "repeat(4, 1fr)" : "repeat(3, 1fr)"};
  grid-column-gap: ${({ theme }) => theme.spacing["3"]};
  grid-template-rows: repeat(auto, auto);
  grid-row-gap: ${({ theme }) => theme.spacing["4"]};

  .book {
    border: ${({ theme }) => `1px solid ${theme.colors.gray["900"]}`};
    background-color: ${({ theme }) => theme.colors.gray[900]};
    ${({ theme }) => theme.borderRadius["rounded-lg"]};
    padding: ${({ theme }) => `${theme.spacing["8"]} ${theme.spacing["6"]}`};

    &:hover {
      cursor:pointer;
      border: ${({ theme }) => `1px solid ${theme.colors.gray["700"]}`};
    }

    &:hover .book__cover-image {
      transform: scale(1.1) translateY(-5px);
    }

    .book__cover-image {
      transition: transform 200ms ease;
    }

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
      span.discounted-price {
        font-weight: 300;
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

const BooksGrid = ({ books, view }) => {
  const { pricesLoading, allPrices } = useCart();
  return (
    <StyledGrid detail={view === "chi-tiet"}>
      <AnimatePresence>
        {books.map((book, index) => (
          <motion.li
            className="book"
            key={book.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              stiffness: 100,
              duration: 0.5,
            }}
          >
            <div className="book__cover">
              <Link
                href="/[categories]/[subcategories]/[bookslug]"
                as={`/${book.category.slug}/${book.subcategory.slug}/${book.slug}`}
              >
                <a>
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
                  />
                </a>
              </Link>
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
                {pricesLoading ? (
                  <Skeleton />
                ) : (
                  new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(allPrices[book.slug].discounted)
                )}
              </span>
              {/* {book.prices.discountedRate && (
                <span className="discounted-rate">
                  {`(-${book.prices.discountedRate}%)`}
                </span>
              )} */}
            </p>
          </motion.li>
        ))}
      </AnimatePresence>
    </StyledGrid>
  );
};

BooksGrid.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      // prices: PropTypes.shape({
      //   discounted: PropTypes.number.isRequired,
      //   discountedRate: PropTypes.number,
      // }).isRequired,
      // category: PropTypes.shape({
      //   name: PropTypes.string.isRequired,
      //   slug: PropTypes.string.isRequired,
      // }).isRequired,
      // subcategory: PropTypes.shape({
      //   name: PropTypes.string.isRequired,
      //   slug: PropTypes.string.isRequired,
      // }).isRequired,
    })
  ).isRequired,
};

export default BooksGrid;
