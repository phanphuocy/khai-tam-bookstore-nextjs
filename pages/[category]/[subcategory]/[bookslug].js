import React from "react";
import axios from "axios";
import styled from "styled-components";

const StyledPage = styled.main`
  ${({ theme }) => theme.maxWidths.maximum};
  padding: ${({ theme }) => `${theme.spacing["16"]} 0`};

  .book-metas {
    ${({ theme }) => theme.borderRadius["rounded"]};
    ${({ theme }) => theme.shadow.base};
    grid-area: metas;
    background-color: white;
    display: flex;
    padding: ${({ theme }) => `${theme.spacing["8"]} ${theme.spacing["4"]}`};

    .col-book-cover {
      flex-basis: 25%;
      display: flex;
      justify-content: flex-end;
      img {
        max-height: 360px;
      }
    }
    .col-spacer {
      height: 100%;
      width: ${({ theme }) => theme.spacing["12"]};
    }
    .col-book-meta {
        padding:${({ theme }) => `${theme.spacing["4"]} 0`};

        .title-container {
            .meta-title {
                font-family: ${({ theme }) => theme.fonts.serif};
                font-weight: 600;
                /* color: ${({ theme }) => theme.colors.gray["200"]}; */
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.06);
                background: rgb(0,0,0);
                background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(62,62,62,1) 56%, rgba(0,0,0,1) 100%);  
                background-clip: text;
                -webkit-background-clip: text;
                color: transparent;
            }            
        }
    
        .meta-links-container {
            padding:${({ theme }) => `${theme.spacing["4"]} 0`};
            border-bottom: 1px solid rgba(0,0,0,0.1);
        }
    }
  }
  .book-info {
    grid-area: info;
  }
  .relevant-books {
    grid-area: relevant;
  }
  .same-author {
    grid-area: same;
  }

  ${({ theme }) => theme.breakpoints.laptop} {
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-rows: repeat(2, auto);
    grid-template-areas:
      "metas metas"
      "info relevant"
      "same same";
  }
`;

const BookPage = ({ book }) => {
  return (
    <StyledPage>
      <div className="section book-metas">
        <div className="col-book-cover">
          <img src={`https://khaitam.com${book.cover}`} alt="Book cover" />
        </div>
        <div className="col-spacer"></div>
        <div className="col-book-meta">
          <div className="title-container">
            <h2 className="meta-title">{book.title}</h2>
          </div>
          <div className="meta-links-container">
            {book.author && (
              <p>
                <span>Tác Giả: </span>
                <a>{book.author}</a>
              </p>
            )}
            {book.publisher && (
              <p>
                <span>Công Ty Phát Hành: </span>
                <a>{book.publisher}</a>
              </p>
            )}
            {book.presshouse && (
              <p>
                <span>Nhà Xuất Bản: </span>
                <a>{book.presshouse}</a>
              </p>
            )}
            {book.translator && <a>{book.author}</a>}
          </div>
        </div>
      </div>
      <div className="section book-info"></div>
      <div className="section relevant-books"></div>
      <div className="section same-author"></div>
    </StyledPage>
  );
};

export async function getStaticPaths() {
  const { data } = await axios.get(
    "http://localhost:3000/api/get-all-books-paths"
  );

  console.log("GETSTATICPATH: Get", data.total, "paths for book-page");

  return {
    paths: data.data,
    fallback: false,
  };
}

export async function getStaticProps(ctx) {
  const { data } = await axios.get(
    `http://localhost:3000/api/get-data-for-bookpage?slug=${ctx.params.bookslug}`
  );
  return {
    props: {
      book: data,
    },
  };
}

export default BookPage;
