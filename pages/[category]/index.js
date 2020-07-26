import React from "react";
import styled from "styled-components";
import Categories from "../../components/Categories/CategoriesNav";
import Header from "../../components/Navigation/Header";
import ThreeSectionsLayout from "../../components/Categories/ThreeSectionsLayout";
// import nc from "next-connect";
// import database from "../../middleware/database";
import fs from "fs";
import BooksGrid from "../../components/grids/BooksGrid";
import Dropdown from "react-dropdown";
import { useRouter } from "next/router";
import orderBy from "lodash.orderby";
import Link from "next/link";

const StyledPage = styled.main`
  background-color: #f2f2f2;
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
  }


  nav.content-pagination {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    a {
      border:${({ theme: { colors } }) => `1px solid ${colors.border.default}`};
      border-right:none;
      padding: ${({ theme: { spacing } }) => `${spacing["2"]} ${spacing["3"]}`};
      color:${({ theme }) => theme.colors.gray["300"]};
      font-size:${({ theme }) => theme.fontSizes.sm};
      transition: background 300ms;
    }       
    a:hover, a:active, a.active {
      text-decoration:none;
      color: white;
      border-color:${({ theme }) => theme.colors.green["600"]};
      background-color:${({ theme }) => theme.colors.green["400"]};
    }
    a:last-of-type {
      border-right:${({ theme: { colors } }) =>
        `1px solid ${colors.border.default}`};
    }
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

const sortOptions = [
  { value: "mac-dinh", label: "Mặc định" },
  { value: "gia:asc", label: "Giá thấp đến cao" },
  { value: "gia:desc", label: "Giá cao về thấp" },
  { value: "tua-sach:asc", label: "Tựa sách A-Z" },
  { value: "tua-sach:desc", label: "Tựa sách Z-A" },
  { value: "tac-gia:asc", label: "Tên tác giả A-Z" },
  { value: "tac-gia:desc", label: "Tên tác giả Z-A" },
];

const CategoryPage = ({ books, total, pages }) => {
  const router = useRouter();
  let currPage = router.query.page || 1;
  return (
    <>
      <Header />
      <StyledPage>
        <ThreeSectionsLayout>
          <div className="content-header">
            <p>{`Tìm Được ${total} Đầu Sách`}</p>
            <Dropdown
              options={sortOptions}
              value={router.query.sort || sortOptions[0]}
              onChange={(e) =>
                router.push(
                  `/${router.query.category}?page=${currPage || 1}&sort=${
                    e.value
                  }`
                )
              }
            />
          </div>
          <BooksGrid books={books} />
          <nav className="content-pagination">
            {pages.map((btn) => (
              <Link
                key={btn.page}
                href={`/${router.query.category}?page=${btn.page}${
                  router.query.sort ? "&sort=" + router.query.sort : ""
                }`}
              >
                <a
                  className={currPage == btn.page ? "active" : ""}
                >{`${btn.first} - ${btn.last}`}</a>
              </Link>
            ))}
          </nav>
        </ThreeSectionsLayout>
      </StyledPage>
    </>
  );
};

export async function getServerSideProps({ query, req, res, params }) {
  // Step 1: read from disc
  let data = fs.readFileSync(`generated/categories/${params.category}.json`, {
    encoding: "utf8",
  });
  data = JSON.parse(data);

  let page = query.page && query.page > 0 ? parseInt(query.page) : 1;

  //  Step 2: sorting the data based on user preference
  let sort = query.sort;

  if (sort && sort !== "mac-dinh") {
    switch (sort.split(":")[0]) {
      case "tac-gia":
        data.books = orderBy(data.books, "author", sort.split(":")[1]);
        break;
      case "tua-sach":
        data.books = orderBy(data.books, "title", sort.split(":")[1]);
        break;
      case "gia":
        data.books = orderBy(
          data.books,
          "prices.discounted",
          sort.split(":")[1]
        );
        break;
      default:
        console.log("nothing hit");
    }
  }

  // Step 3: limit the return results by paging
  let limit = 24;
  let nbOfPages = Math.ceil(data.books.length / limit);
  let pages = [];
  for (let i = 1; i <= nbOfPages; i++) {
    if (i <= 3 || nbOfPages - i < 3 || i == page) {
      if (i === nbOfPages) {
        pages.push({
          page: i,
          first: (i - 1) * limit + 1,
          last: data.books.length,
        });
      } else {
        pages.push({
          page: i,
          first: (i - 1) * limit + 1,
          last: i * limit,
        });
      }
    }
  }

  let books = data.books.slice(
    pages.find((p) => p.page === page).first - 1,
    pages.find((p) => p.page === page).last
  );
  console.log("page", page);
  console.log("PAGEs", pages);
  console.log("books", books.length);

  return {
    props: {
      books: books,
      total: data.books.length,
      filter: data.filters,
      pages,
    },
  };
}
export default CategoryPage;
