import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const StyledGrid = styled.ul`
  padding: ${({ theme }) => theme.spacing["4"]};
  background-color: white;
  display: grid;
  grid-template-columns: ${(props) =>
    props.detail ? "repeat(4, 1fr)" : "repeat(3, 1fr)"};
  /* grid-column-gap: ${({ theme }) => theme.spacing["6"]}; */
  grid-template-rows: repeat(auto, auto);
  /* grid-row-gap: ${({ theme }) => theme.spacing["4"]}; */

  li.book {
    border: ${({ theme }) => `0.5px solid ${theme.colors.neutral["800"]}`};
    /* background-color: ${({ theme }) => theme.colors.neutral[800]}; */
    /* ${({ theme }) => theme.borderRadius["rounded-lg"]} */
    padding:${({ theme }) => `${theme.spacing["6"]} ${theme.spacing["2"]}`};
    &:hover {
      cursor:pointer;
      /* border: ${({ theme }) =>
        `0.5px solid ${theme.colors.neutral["400"]}`}; */
    }

    &:hover .book__cover-image {
      transform: scale(1.05) translateY(-5px);
      ${({ theme }) => theme.shadow["xl"]};
    }

    .book__cover-image {
      transition: transform 200ms ease, shadow 200ms ease;
    }

    .book__cover {
      display: flex;
      justify-content: center;
      /* padding: ${({ theme }) => `${theme.spacing["6"]} 0`}; */

      .book__cover-image {
        ${({ theme }) => theme.shadow.base};
        height: 260px;
        /* max-height: 240px; */
        max-width: 100%;
        display: block;
        object-fit: contain;
      }
    }

    .book__info {
      padding: ${({ theme }) => `${theme.spacing["2"]} ${theme.spacing["6"]}`};
      .book__info-title {
        font-weight: 600;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        /* font-family: ${({ theme }) => theme.fonts.serif}; */
        font-size: ${({ theme }) => theme.fontSizes.sm};
        margin-bottom: ${({ theme }) => theme.spacing["1"]};
      }
      .book__info-author {
        color: ${({ theme }) => theme.colors.gray["300"]};
        font-size: ${({ theme }) => theme.fontSizes.sm};
        margin-bottom: ${({ theme }) => theme.spacing["2"]};
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }

    .prices-container {
      padding: ${({ theme }) =>
        `${theme.spacing["2"]} ${theme.spacing["6"]} ${theme.spacing["6"]}`};

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

  ${({ theme }) => theme.breakpoints.md} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${({ theme }) => theme.breakpoints.sm} {
    grid-template-columns: 1fr 1fr;
    /* Styling */
    padding:${({ theme }) => `${theme.spacing["2"]} ${theme.spacing["1"]}`};

    li.book {
      padding: ${({ theme }) => `${theme.spacing["2"]} ${theme.spacing["2"]}`};

      .book__cover {

        picture {
          display: flex;
          justify-content: center;

          .book__cover-image {
            height: 180px;
          }
        }
       
      }

      div.book__info {
        padding:${({ theme }) => `${theme.spacing["2"]} ${theme.spacing["2"]}`};
      }
      .prices-container {
        padding:${({ theme }) => `${theme.spacing["1"]} ${theme.spacing["2"]}`};
      }
    }
  }

  
`;

const BooksGrid = ({ books, view = "chi-tiet" }) => {
  // useEffect(() => {}, [books[1].slug], books[books.length - 1].slug);

  return (
    <StyledGrid
      detail={view === "chi-tiet"}
      key={books[books.length - 1].slug + books[0].slug}
    >
      <AnimatePresence>
        {books.map((book, index) => (
          <li className="book" key={book.slug}>
            <div className="book__cover">
              <Link
                href="/[categories]/[subcategories]/[bookslug]"
                as={`/${book.category.slug}/${book.subcategory.slug}/${book.slug}`}
              >
                <a>
                  <motion.picture
                    initial={{ filter: "grayscale(0.8)" }}
                    animate={{ filter: "grayscale(0)" }}
                    transition={{
                      stiffness: 100,
                      duration: 1,
                    }}
                  >
                    <source
                      srcSet={
                        book.cloudinaryId
                          ? `https://res.cloudinary.com/khaitam/image/upload/h_280,q_80,c_lpad,b_white/v1596767364/${book.cloudinaryId}.webp`
                          : null
                      }
                      type="image/webp"
                    />
                    <img
                      className="book__cover-image"
                      src={
                        book.cloudinaryId
                          ? `https://res.cloudinary.com/khaitam/image/upload/h_280,q_80,c_lpad,b_white/v1596767364/${book.cloudinaryId}.jpg`
                          : `https://khaitam.com${book.cover}`
                      }
                      alt="Book cover"
                      width="auto"
                    />
                  </motion.picture>
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
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(book.prices.discounted)}
              </span>
              {/* {book.prices.discountedRate && (
                <span className="discounted-rate">
                  {`(-${book.prices.discountedRate}%)`}
                </span>
              )} */}
            </p>
            {/* </motion.li> */}
          </li>
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
