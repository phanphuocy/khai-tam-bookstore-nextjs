import React from "react";
import styled from "styled-components";
import Link from "next/link";
import bookCategories from "../../../constants/book-categories";
import fs from "fs";

// Import custom components
import ThreeSectionsLayout from "../../../components/Categories/ThreeSectionsLayout";
import { useRouter } from "next/router";

const StyledPage = styled.main`
${({ theme }) => theme.backgrounds.woodTexture};
 padding: ${({ theme }) => `${theme.spacing["8"]} 0`};

  .container {
    ${({ theme }) => theme.maxWidths.desktop};
    display: grid;
  }

  & > div {
    min-height: 2rem;
  }

  .categories {
    grid-area: categories;
    background-color: white;
  }

  
  .content {
    ${({ theme }) => theme.borderRadius["rounded-lg"]};
    grid-area: content;
    /* background-color: ${({ theme }) => theme.colors.gray["900"]}; */
    background-color: rgba(255,255,255,0.8);
    padding: ${({ theme }) => theme.spacing["4"]};

    .content-header {
      padding: ${({ theme }) => theme.spacing["4"]};
      border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray["600"]}`};
    } 

    ul.books-container {
      padding: ${({ theme }) => theme.spacing["4"]};
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-column-gap: ${({ theme }) => theme.spacing["8"]};
      grid-template-rows: repeat(auto, auto);
      grid-row-gap: ${({ theme }) => theme.spacing["8"]};

      .book-card {
        /* border: 1px solid gray; */
        .book-cover-container {
          display: flex;
          justify-content: center;
          padding-bottom: ${({ theme }) => theme.spacing["4"]};

          .book-cover-image {
            ${({ theme }) => theme.shadow.base};
            height: 240px;
            max-height: 240px;
            max-width: 100%;
            display: block;
            object-fit: contain;
          }
        }
        .book-title {
          font-weight: 600;
          font-family: ${({ theme }) => theme.fonts.serif};
          font-size: 18px;
          margin-bottom: ${({ theme }) => theme.spacing["1"]};
        }
        .book-author {
          color: ${({ theme }) => theme.colors.gray["300"]};
          margin-bottom: ${({ theme }) => theme.spacing["2"]};
        }

        .prices-container {
          .discounted-price {
            font-weight: 800;
            font-size:${({ theme }) => theme.fontSizes.md};
            color: ${({ theme }) => theme.colors.green["300"]};
            
          }

          .discounted-rate {
            margin-left: ${({ theme }) => theme.spacing["2"]};
            color: ${({ theme }) => theme.colors.green["500"]};
          }
        }
      }
    }
  }
  .filter {
    grid-area: filter;
  }

  ${({ theme }) => theme.breakpoints.laptop} {
    .container {
      grid-template-columns: 3fr 13fr;
      grid-column-gap: ${({ theme }) => theme.spacing["8"]};
      grid-template-rows: repeat(2, auto);
      grid-template-areas:
        "categories content"
        "filter content";
    }
  }
`;

const CategoryPage = ({ data, subcategory, category }) => {
  return (
    <StyledPage>
      <ThreeSectionsLayout>
        <div className="content-header">
          <p>{`Tìm Được ${data.books.length} Đầu Sách`}</p>
        </div>
        <ul className="books-container">
          {data.books.map((book) => (
            <li className="book-card" key={book.slug}>
              <div className="book-cover-container">
                <img
                  className="book-cover-image"
                  src={`https://khaitam.com${book.cover}`}
                  alt="Book cover"
                />
              </div>
              <Link
                href="/[categories]/[subcategories]/[bookslug]"
                as={`/${category}/${subcategory}/${book.slug}`}
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
      </ThreeSectionsLayout>
    </StyledPage>
  );
};

export async function getStaticPaths() {
  let paths = fs.readFileSync("generated/paths/subcategory.json", {
    encoding: "utf8",
  });

  paths = JSON.parse(paths);

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { category, subcategory } }) {
  let data = fs.readFileSync(`generated/categories/${subcategory}.json`, {
    encoding: "utf8",
  });

  data = JSON.parse(data);

  return {
    props: {
      data,
      subcategory,
      category,
    },
  };
}

// export async function getServerSideProps(context) {
//   const { req, res, params } = context;

//   console.log("IM IN STATIC PROPS", context);

//   const handler = nc();

//   handler.use(database);

//   try {
//     await handler.apply(req, res);

//     console.log(req.db);

//     console.log("PARAMS:", params);

//     let query = params.subcategory;

//     let cursor = await req.db.collection("books").find(
//       {
//         "subcategory.slug": query,
//       },
//       { projection: { introduction: 0, _id: 0 } }
//     );

//     let books = await cursor.toArray();
//     let total = books.length;

//     let authorAggre = await req.db.collection("books").aggregate([
//       {
//         $match: {
//           $and: [
//             { "subcategory.slug": query },
//             { author: { $exists: true, $ne: null } },
//           ],
//         },
//       },
//       { $sortByCount: "$author" },
//       { $limit: 5 },
//     ]);

//     authorAggre = await authorAggre.toArray();

//     console.log("AGGRE", authorAggre);

//     let publisherAggre = await req.db.collection("books").aggregate([
//       {
//         $match: {
//           $and: [
//             { "subcategory.slug": query },
//             { publisher: { $exists: true, $ne: null } },
//           ],
//         },
//       },
//       { $sortByCount: "$publisher" },
//       { $limit: 5 },
//     ]);

//     publisherAggre = await publisherAggre.toArray();

//     console.log("PUB", publisherAggre);

//     let translatorAggre = await req.db.collection("books").aggregate([
//       {
//         $match: {
//           $and: [
//             { "subcategory.slug": query },
//             { translator: { $exists: true, $ne: null } },
//           ],
//         },
//       },
//       { $sortByCount: "$translator" },
//       { $limit: 5 },
//     ]);

//     translatorAggre = await translatorAggre.toArray();

//     console.log("TRANS", translatorAggre);

//     let presshouseAggre = await req.db.collection("books").aggregate([
//       {
//         $match: {
//           $and: [
//             { "subcategory.slug": query },
//             { presshouse: { $exists: true, $ne: null } },
//           ],
//         },
//       },
//       { $sortByCount: "$presshouse" },
//       { $limit: 5 },
//     ]);

//     presshouseAggre = await presshouseAggre.toArray();

//     console.log("PRESS", presshouseAggre);

//     console.log(books.length);

//     return {
//       props: {
//         books,
//         total,
//         filter: {
//           authorCounts: authorAggre,
//           translatorCounts: translatorAggre,
//           publisherCounts: publisherAggre,
//           presshouseCounts: presshouseAggre,
//         },
//       },
//     };
//   } catch (error) {
//     console.log(error.message);
//   }
// }
export default CategoryPage;
