import React from "react";
import axios from "axios";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import nc from "next-connect";
import database from "../../../middleware/database";

// import { MongoClient } from "mongodb";

// const client = new MongoClient(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// async function database(req, res, next) {
//   if (!client.isConnected()) await client.connect();
//   req.dbClient = client;
//   req.db = client.db("development");
//   return next();
// }

const StyledPage = styled.main`
  ${({ theme }) => theme.maxWidths.maximum};
  padding: ${({ theme }) => `${theme.spacing["16"]} 0`};

  .container {
  }

  .elevated {
    background-color: white;
    ${({ theme }) => theme.shadow.base};
  }

  .book-metas {
    ${({ theme }) => theme.borderRadius["rounded"]};
    grid-area: metas;
    display: flex;
    padding: ${({ theme }) => `${theme.spacing["8"]} ${theme.spacing["4"]}`};

    .col-book-cover {
      flex-basis: 30%;
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
      padding: ${({ theme }) => `${theme.spacing["4"]} 0`};

      .title-container {
        .meta-title {
          font-family: ${({ theme }) => theme.fonts.serif};
          font-weight: 600;
          color: ${({ theme }) => theme.colors.gray["200"]};
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.06);
        }
      }

      .single-meta-item {
        margin: ${({ theme }) => `${theme.spacing["1"]} 0`};
      }

      .meta-links-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: ${({ theme }) => theme.spacing["8"]};
        padding: ${({ theme }) => `${theme.spacing["4"]} 0`};
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }

      .physical-info-container {
        padding: ${({ theme }) => `${theme.spacing["4"]} 0`};
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

  .book-info {
    padding: ${({ theme }) => `${theme.spacing["8"]} ${theme.spacing["4"]}`};

    .info-content {
      padding: ${({ theme }) => `${theme.spacing["8"]} ${theme.spacing["32"]}`};

      p {
        /* font-family: ${({ theme }) => theme.fonts.serif}; */
        margin-bottom: ${({ theme }) => theme.spacing["4"]};
        line-height: 150%;
      }
    }
  }

  ${({ theme }) => theme.breakpoints.laptop} {
    display: grid;
    grid-template-columns: 6fr 4fr;
    grid-column-gap: ${({ theme }) => theme.spacing["8"]};
    grid-template-rows: repeat(2, auto);
    grid-row-gap: ${({ theme }) => theme.spacing["8"]};
    grid-template-areas:
      "metas metas"
      "info relevant"
      "same same";
  }
`;

const BookPage = ({ book, similar }) => {
  return (
    <StyledPage>
      <div className="section elevated book-metas">
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
              <p className="single-meta-item">
                <span>Tác Giả: </span>
                <a>{book.author}</a>
              </p>
            )}
            {book.publisher && (
              <p className="single-meta-item">
                <span>Công Ty Phát Hành: </span>
                <a>{book.publisher}</a>
              </p>
            )}
            {book.presshouse && (
              <p className="single-meta-item">
                <span>Nhà Xuất Bản: </span>
                <a>{book.presshouse}</a>
              </p>
            )}
            {book.translator && (
              <p className="single-meta-item">
                <span>Dịch Giả: </span>
                <a>{book.translator}</a>
              </p>
            )}
          </div>
          <div className="physical-info-container">
            {book.nbPage && (
              <p className="single-meta-item">
                <span>Số Trang: </span>
                {book.nbPage}
              </p>
            )}
            {book.weight && (
              <p className="single-meta-item">
                <span>Trọng Lượng (gr): </span>
                {book.weight}
              </p>
            )}
            {book.coverType && (
              <p className="single-meta-item">
                <span>Hình Thức Bìa: </span>
                {book.coverType}
              </p>
            )}
            {book.publishDate && (
              <p className="single-meta-item">
                <span>Năm Xuất Bản: </span>
                {book.publishDate}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="section elevated book-info">
        <div className="info-content">
          <ReactMarkdown source={book.introduction.bookIntroduction} />
        </div>
      </div>
      <div className="section relevant-books">
        <ul>
          {similar.map((book) => (
            <li className="book-card" key={book.slug}>
              <div className="book-cover-container">
                <img
                  className="book-cover-image"
                  src={`https://khaitam.com${book.cover}`}
                  alt="Book cover"
                  width={120}
                />
              </div>
              <Link
                href="/[categories]/[subcategories]/[bookslug]"
                as={`/${book.category.slug}/${book.subcategory.slug}/${book.slug}`}
              >
                <a>
                  <p className="book-title">{book.title}</p>
                  <p className="book-author">{book.author}</p>
                </a>
              </Link>

              <p className="prices-container">
                <span className="discounted-price">
                  {book.prices.discounted}
                </span>
                {book.prices.discountedRate && (
                  <span className="discounted-rate">
                    {`(-${book.prices.discountedRate}%)`}
                  </span>
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="section same-author"></div>
    </StyledPage>
  );
};

// export async function getStaticPaths(ctx) {
//   console.log("GSP", ctx);
//   const { data } = await axios.get(
//     "http://localhost:3000/api/get-all-books-paths",
//     {
//       timeout: 10000,
//     }
//   );

//   console.log("GETSTATICPATH: Get", data.total, "paths for book-page");

//   return {
//     paths: data.data,
//     fallback: false,
//   };
// }

// export async function getStaticProps(ctx) {
//   const { data } = await axios.get(
//     `http://localhost:3000/api/get-data-for-bookpage?slug=${ctx.params.bookslug}`
//   );
//   return {
//     props: {
//       book: data.book,
//       similar: data.similar,
//     },
//   };
// }

export async function getServerSideProps({ req, res, params }) {
  const handler = nc();

  handler.use(database);

  try {
    await handler.apply(req, res);
    console.log(req.db);
    console.log("PARAMS:", params);
    const slug = params.bookslug;

    let book = await req.db.collection("books").findOne({
      slug: slug,
    });

    delete book._id;

    let similar = await req.db
      .collection("books")
      .find(
        {
          $and: [
            {
              $text: {
                $search: book.tags.join(" "),
              },
            },
            {
              slug: { $ne: book.slug },
            },
          ],
        },
        { score: { $meta: "textScore" } }
      )
      .limit(20);

    similar = await similar.toArray();

    similar.forEach(function (doc) {
      delete doc.introduction;
      delete doc.tags;
      delete doc._id;
    });

    return {
      props: {
        book,
        similar,
      },
    };
  } catch (error) {
    console.log(error.message);
  }
}

export default BookPage;
