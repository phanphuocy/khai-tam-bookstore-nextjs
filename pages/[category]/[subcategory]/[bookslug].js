import React from "react";
import axios from "axios";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import fs from "fs";
import { useCart } from "../../../contexts/cartContext";

import Header from "../../../components/Navigation/Header";
import CartModal from "../../../components/Modals/CartModal";

// Import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faHome,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const StyledPage = styled.main`
  /* ${({ theme }) => theme.backgrounds.woodTexture}; */
  background-color:white;

  .container {
    ${({ theme }) => theme.maxWidths.desktop};
    ${({ theme }) => theme.borderRadius.base};
    ${({ theme }) => theme.borderRadius["rounded"]};
    /* border: ${({ theme }) => theme.borders.base}; */
    background-color: white;
    /* padding: ${({ theme }) =>
      `${theme.spacing["12"]} ${theme.spacing["24"]}`}; */
    section.top-navigation {
      padding:${({ theme: { spacing } }) => `${spacing[8]} 0`};
      .slash {
        color:${({ theme }) => theme.colors.gray["600"]};
      }
      a  {
        padding:${({ theme: { spacing } }) =>
          `${spacing["2"]} ${spacing["2"]}`};
          margin:${({ theme: { spacing } }) =>
            `${spacing["2"]} ${spacing["1"]}`};
        color:${({ theme }) => theme.colors.gray["400"]};

        &:hover, &:active {
          ${({ theme: { borderRadius } }) => borderRadius["rounded"]};
          background-color: ${({ theme: { colors } }) => colors.gray["800"]};
          color:${({ theme }) => theme.colors.gray["300"]};
          text-decoration:none;
        }
      }
    }
    section.book-info {
       padding: ${({ theme }) =>
         `${theme.spacing["12"]} ${theme.spacing["24"]}`};
      display: grid;
      grid-template-columns: 5fr 6fr;
      grid-template-rows: repeat(3, auto);
      grid-template-areas:
        "cover info"
        "action info"
        ". info";

      .cover-container {
        grid-area: cover;
        display: flex;
        justify-content: center;

        img {
          max-width: 15rem;
        }
      }
      .infomation-container {
        grid-area: info;

        h1.title {
          font-size: ${({ theme }) => theme.fontSizes["xl"]};
          font-family: ${({ theme }) => theme.fonts.title};
          color:${({ theme }) => theme.colors.gray["200"]};
          /* letter-spacing: 1px; */
          font-weight: bold;
          line-height: 125%;
          margin-top: ${({ theme }) => theme.spacing["2"]};
        }

        .links-container {
          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              flex-basis: 50%;
              padding: ${({ theme }) =>
                `${theme.spacing["2"]} ${theme.spacing["6"]} ${theme.spacing["2"]} 0`};
             

              .label {
                color: ${({ theme }) => theme.colors.gray["300"]};
                margin-right: ${({ theme }) => theme.spacing["2"]};
              }
            }
          }
        }
        .addiInfos-container {
          li {
            flex-basis: 50%;
            padding: ${({ theme }) => `${theme.spacing["2"]} 0`};

            .label {
              color: ${({ theme }) => theme.colors.gray["300"]};
              margin-right: ${({ theme }) => theme.spacing["2"]};
            }
          }
        }

        .addiServices-container {
          padding: ${({ theme }) => `${theme.spacing["3"]} 0`};

          h6.addiServices-container__label {
            margin-bottom:${({ theme: { spacing } }) => spacing["2"]};
          }

          .addiServices-container__items {
            border: 1px solid green;
            ${({ theme }) => theme.borderRadius["rounded-lg"]};
            background-color: ${({ theme: { colors } }) => colors.green["900"]};
            padding:${({ theme }) =>
              `${theme.spacing["4"]} ${theme.spacing["6"]}`};
          }

          p,
          h6 {
            line-height: 200%;
            svg {
              margin-right: ${({ theme }) => theme.spacing["4"]};
              color: ${({ theme }) => theme.colors.green["500"]};
            }
          }
        }
      }
      .action-container {
        grid-area: action;
        padding:${({ theme }) => theme.spacing["4"]};
        display: flex;
        justify-content: center;

        .add-to-cart-btn {
          ${({ theme }) => theme.borderRadius["rounded-full"]};
          background-color:${({ theme }) => theme.colors.green["500"]};
          padding:${({ theme }) => theme.spacing["4"]};
          color: white;
        }
        .add-to-cart-btn:hover,
        .add-to-cart-btn:active {
          background-color:${({ theme }) => theme.colors.green["400"]};
        }
      }
    }

    section.book-introduction {
      padding: ${({ theme }) => `${theme.spacing["8"]} 0`};
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 40rem;
      margin: 0 auto;
      border-top: ${({ theme }) => theme.borders.base};

      h4 {
        padding: ${({ theme }) => `${theme.spacing["8"]} 0`};
        font-family: ${({ theme }) => theme.fonts.serif};
      }

      p {
        /* text-indent: ${({ theme }) => theme.spacing["4"]}; */
        line-height: 150%;
        margin-bottom: ${({ theme }) => theme.spacing["3"]};
      }

      p:first-of-type:first-letter {
        color: ${({ theme }) => theme.colors.green["300"]};
        float: left;
        font-family: Georgia;
        font-size: 75px;
        line-height: 60px;
        padding-top: 4px;
        padding-right: 8px;
        padding-left: 3px;
      }
      p:first-of-type {
        text-indent: -1px;
      }
    }
  }

  .similar-books-container {
    ul {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap:${({ theme }) => theme.spacing["6"]};
      grid-template-rows: repeat(auto, auto);
      grid-row-gap:${({ theme }) => theme.spacing["4"]};

      padding:${({ theme }) => `${theme.spacing["8"]} 0`};

      li.si-book {
        ${({ theme: { borderRadius } }) => borderRadius["rounded"]};
        display: flex;
        /* border-right: ${({ theme }) => theme.borders.base}; */
        margin-right: ${({ theme }) => theme.spacing["1"]};
        padding-right: ${({ theme }) => theme.spacing["1"]};         
        padding: ${({ theme: { spacing } }) =>
          `${spacing["4"]} ${spacing["4"]}`};
        background-color:${({ theme }) => theme.colors.gray["900"]};
        

        .si-book-cover {
          max-width: 45%;
          margin-right: 5%;

          img {
            ${({ theme }) => theme.shadow.base};
          }

        }
        .si-book-info {
          padding:${({ theme }) => `${theme.spacing["2"]} 0`};
          flex: 50% 0 1;

          .si-book-category {
            /* padding:${({ theme }) =>
              `${theme.spacing["1"]} ${theme.spacing["3"]}`};
            ${({ theme }) => theme.borderRadius["rounded-full"]};
            border: ${({ theme }) =>
              `2px solid ${theme.colors.green["500"]}`}; */
            color:${({ theme }) => theme.colors.green["500"]};
            display: inline-block;
            margin-bottom:${({ theme }) => theme.spacing["2"]};
          }

          .si-book-title {
            font-weight: 600;
            font-family:${({ theme }) => theme.fonts.serif};
          }

          .si-book-author {
            color:${({ theme }) => theme.colors.gray["300"]};
          }
        }
      }
    }
  }
`;

const BookPage = ({ book }) => {
  let links = [
    book.author && { label: "Tác Giả:", text: book.author },
    book.translator && { label: "Dịch Giả:", text: book.translator },
    book.publisher && { label: "C.ty Phát Hành:", text: book.publisher },
    book.presshouse && { label: "Nhà Xuất Bản:", text: book.presshouse },
  ];
  links = links.filter((link) => link);

  let addiInfos = [
    book.nbPage && { label: "Số Trang:", text: book.nbPage },
    book.weight && { label: "Trọng Lượng (gr):", text: book.weight },
    book.coverType && { label: "Hình Thức Bìa:", text: book.coverType },
    book.pubblishDate && { label: "Năm Xuất Bản", text: book.pubblishDate },
  ];
  addiInfos = addiInfos.filter((info) => info);

  const { appendBook, removeBook, items } = useCart();
  let hasAlreadyAdded =
    items.map((item) => item.slug).indexOf(book.slug) !== -1;

  return (
    <>
      <Header sameElevate={true} />
      <StyledPage>
        <div className="container">
          <section className="top-navigation">
            <nav>
              <span>
                <Link href="/">
                  <a>
                    <FontAwesomeIcon icon={faHome} />
                  </a>
                </Link>
              </span>
              <FontAwesomeIcon className="slash" icon={faAngleRight} />
              <span>
                <Link href="/[category]" as={`/${book.category.slug}`}>
                  <a>{book.category.name}</a>
                </Link>
              </span>
              <FontAwesomeIcon className="slash" icon={faAngleRight} />
              <span>
                <Link
                  href="/[category]/[subcategory]"
                  as={`/${book.category.slug}/${book.subcategory.slug}`}
                >
                  <a> {book.subcategory.name}</a>
                </Link>
              </span>
            </nav>
          </section>
          <section className="book-info">
            <div className="cover-container">
              <img
                src={`https://khaitam.com${book.cover}`}
                alt={`Anh Bia Cua ${book.title}`}
              />
            </div>
            <div className="infomation-container">
              <h1 className="title">{book.title}</h1>
              <div className="links-container">
                <ul>
                  {links.map((link) => (
                    <li key={link.label}>
                      <span className="label">{link.label}</span>
                      <span className="text">{link.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="addiInfos-container">
                <ul>
                  {addiInfos.map((link) => (
                    <li key={link.label}>
                      <span className="label">{link.label}</span>
                      <span className="text">{link.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="addiServices-container">
                <h6 className="addiServices-container__label">
                  Giá Trị & Dịch Vụ Cộng Thêm
                </h6>
                <div className="addiServices-container__items">
                  <p>
                    <FontAwesomeIcon icon={faPlusCircle} />
                    <span>Bookmark miễn phí</span>
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faPlusCircle} />
                    <span>
                      Giao hàng miễn phí cho đơn hàng từ 150k (nội thành HCM) và
                      từ 500k (ngoại thành HCM/ Tỉnh)
                    </span>
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faPlusCircle} />
                    <span>
                      Với mỗi 90k trong đơn hàng, quý khách được tặng 1
                    </span>
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faPlusCircle} />
                    <span>Bao đọc sách hay, đổi ngay nếu dở (chi tiết)</span>
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faPlusCircle} />
                    <span>Bao sách miễn phí nếu có yêu cầu</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="action-container">
              <button
                className="add-to-cart-btn"
                onClick={() => appendBook(book)}
                disabled={hasAlreadyAdded}
              >
                {hasAlreadyAdded ? "Đã Thêm Vào Giỏ" : "Thêm Vào Giỏ"}
              </button>
            </div>
          </section>
          <section className="book-introduction">
            <h4>Giới Thiệu</h4>
            {book.introduction && book.introduction.bookIntroduction && (
              <ReactMarkdown source={book.introduction.bookIntroduction} />
            )}
          </section>
        </div>
        <div style={{ height: "1rem" }}></div>
        <div className="container">
          <h3 section="panel-title">Sách Cũng Của {book.author}</h3>
        </div>
        <div style={{ height: "1rem" }}></div>
        <div className="container similar-books-container">
          <h3 section="panel-title">Có Thể Bạn Quan Tâm</h3>
          <ul>
            {book.similar.map((siBook) => (
              <li key={siBook.slug} className="si-book">
                <div className="si-book-cover">
                  <img
                    src={`https://khaitam.com${siBook.cover}`}
                    alt={`Book cover of ${siBook.title}`}
                    width="100%"
                  />
                </div>
                <div className="si-book-info">
                  <Link
                    href="/[category]/[subcategory]/[bookslug]"
                    as={`/${siBook.category.slug.replace(
                      /\//,
                      "-"
                    )}/${siBook.subcategory.slug.replace(/\//, "-")}
                  }/${siBook.slug}`}
                  >
                    <a>
                      <p className="si-book-category">
                        {siBook.subcategory.name}
                      </p>
                      <p className="si-book-title">{siBook.title}</p>
                      <p className="si-book-author">{siBook.author}</p>
                    </a>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ height: "1rem" }}></div>
      </StyledPage>
      <CartModal />
    </>
  );
};

export async function getStaticPaths(ctx) {
  let paths = fs.readFileSync("generated/paths/books.json", {
    encoding: "utf8",
  });

  paths = JSON.parse(paths);

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(ctx) {
  let book = fs.readFileSync(`generated/books/${ctx.params.bookslug}.json`, {
    encoding: "utf8",
  });
  book = JSON.parse(book);
  return {
    props: {
      book,
    },
  };
}

// export async function getServerSideProps({ req, res, params }) {
//   const handler = nc();

//   handler.use(database);

//   try {
//     await handler.apply(req, res);
//     console.log(req.db);
//     console.log("PARAMS:", params);
//     const slug = params.bookslug;

//     let book = await req.db.collection("books").findOne({
//       slug: slug,
//     });

//     delete book._id;

//     let similar = await req.db
//       .collection("books")
//       .find(
//         {
//           $and: [
//             {
//               $text: {
//                 $search: book.tags.join(" "),
//               },
//             },
//             {
//               slug: { $ne: book.slug },
//             },
//           ],
//         },
//         { score: { $meta: "textScore" } }
//       )
//       .limit(20);

//     similar = await similar.toArray();

//     similar.forEach(function (doc) {
//       delete doc.introduction;
//       delete doc.tags;
//       delete doc._id;
//     });

//     return {
//       props: {
//         book,
//         similar,
//       },
//     };
//   } catch (error) {
//     console.log(error.message);
//   }
// }

export default BookPage;
