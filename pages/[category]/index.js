import React, { useState } from "react";
import styled from "styled-components";
import Categories from "../../components/Categories/CategoriesNav";
import Header from "../../components/Navigation/Header";
import Footer from "../../components/Navigation/Footer";
import ThreeSectionsLayout from "../../components/Categories/ThreeSectionsLayout";
import BooksGrid from "../../components/grids/BooksGrid";
import BooksList from "../../components/lists/BooksList";
import Dropdown from "react-dropdown";
import { useRouter } from "next/router";
import orderBy from "lodash.orderby";
import Link from "next/link";
import categoryName from "../../names/categoryName.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faThLarge, faThList } from "@fortawesome/free-solid-svg-icons";
import CategoriesNav from "../../components/Categories/CategoriesNav";
import connectMongoose from "../../database/initMongoose";
import Book from "../../database/bookModel";
import Sticky from "react-stickynode";
import OneMainTwoSidebars from "../../components/Layout/OneMainTwoSidebars";

// Import custom components
import Pagination from "../../components/Navigation/Pagination";

const StyledPage = styled.main`
  /* ${({ theme }) => theme.backgrounds.bambooTexture};   */
  /* background-color:${({ theme }) => theme.colors.neutral["800"]}; */
  background-color:white;
  display: grid;
  grid-template-columns: 280px auto 280px;
  grid-template-rows: auto auto;
  /* grid-column-gap: ${({ theme }) => theme.spacing["8"]}; */
  grid-template-areas:
    "title title title"
    "categories content filters"; 

  & > section {
    min-height: 2rem;
  }

  section.page__title {
    grid-area: title;
    background-color:${({ theme }) => theme.colors.green["400"]};
    ${({ theme }) => theme.backgrounds.bambooGreen}
  }
  section.page__categories {
    grid-area: categories;
    background-color:${({ theme }) => theme.colors.neutral["800"]};
  }
  section.page__content {
    grid-area: content;
    background-color:white;
    padding: ${({ theme }) => `${theme.spacing["12"]} 0`};

    .page__content-container {
      max-width: 1028px;
      margin: 0 auto;
      
    }
  }
  section.page__filters {
    grid-area: filters;
    background-color:${({ theme }) => theme.colors.neutral["800"]};
  }

  .categories {
    grid-area: categories;
    background-color: white;
  }

  .page-title {
    padding:${({ theme }) => `${theme.spacing["16"]} ${theme.spacing["16"]}`};
    display: flex;
    flex-direction: column;
    align-items: center;
    color:${({ theme }) => theme.colors.neutral["800"]};
  }
  
  .content {
    ${({ theme }) => theme.borderRadius["rounded-lg"]};
    grid-area: content;
    background-color:white;
    padding: ${({ theme }) => `${theme.spacing["4"]} ${theme.spacing["8 "]}`};

    .content-title {
      padding: ${({ theme }) =>
        `${theme.spacing["6"]} ${theme.spacing["4"]} ${theme.spacing["2"]}`};
    }

    .content-header {
      padding: ${({ theme }) => theme.spacing["4"]};
      border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray["600"]}`};
      display: flex;
      align-items: center;
      justify-content: space-between;

      .header__views {
        display: flex;
        border:${({ theme }) => `1px solid ${theme.colors.border.default}`};

        button.header__views-select {
          padding:${({ theme: { spacing } }) =>
            `${spacing["2"]} ${spacing["3"]}`};
          /* border:${({ theme }) =>
            `1px solid ${theme.colors.border.default}`}; */

          svg {
            color:${({ theme }) => theme.colors.border.default};
          }

          &:hover, &:active, &.active {
            background-color:${({ theme }) => theme.colors.gray["700"]};
            svg {
              color:${({ theme }) => theme.colors.gray["300"]};
            }
          }
        }
      }
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


  ${({ theme }) => theme.breakpoints.sm} {
    grid-template-columns: 100%;
    grid-template-rows: auto auto auto auto;
    grid-template-areas: 
      "title"
      "content";

    .page-title {
      padding:${({ theme }) => `${theme.spacing["4"]} ${theme.spacing["1"]}`};

      h1 {
        font-size:${({ theme }) => theme.fontSizes.lg};
      }
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

const views = [
  // { value: "mac-dinh", label: "Mặc Định", icon: faThLarge },
  { value: "chi-tiet", label: "Chi Tiết", icon: faTh },
  { value: "list", label: "List", icon: faThList },
];

const CategoryPage = ({ category, books, total, pages, filters }) => {
  const router = useRouter();
  const [view, setView] = useState(views[0].value);
  let currPage = router.query.page || 1;
  console.log(router);
  return (
    <>
      <Header />
      <StyledPage>
        <section className="page__title page-title">
          <p>Tủ Sách</p>
          <h1>{categoryName[category]}</h1>
        </section>
        <OneMainTwoSidebars>
          <h1>Test</h1>
        </OneMainTwoSidebars>
        <section className="page__categories" id="categories">
          <Sticky enabled={true} top={50} bottomBoundary="#content">
            <CategoriesNav />
          </Sticky>
        </section>
        <section className="page__content" id="content">
          <div className="page__content-container content">
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
              <div className="header__views">
                {views.map((el) => (
                  <button
                    key={el.value}
                    className={`header__views-select ${
                      view === el.value ? "active" : ""
                    }`}
                    onClick={() => setView(el.value)}
                  >
                    <FontAwesomeIcon icon={el.icon} />
                  </button>
                ))}
              </div>
            </div>
            {view !== "list" ? (
              <BooksGrid books={books} view={view} />
            ) : (
              <BooksList books={books} />
            )}
            <nav className="content-pagination">
              <Pagination
                total={total}
                limit={24}
                curr={currPage}
                routerPathname={router.pathname}
                routerQuery={router.query}
              />
            </nav>
          </div>
        </section>
        <section className="page__filters"></section>
      </StyledPage>
      <Footer />
    </>
  );
};

export async function getServerSideProps({ query, req, res, params }) {
  try {
    // Step 1: Prepare to query
    let page =
      query.page && parseInt(query.page) > 0 ? parseInt(query.page) : 1;
    let limit = 24;
    let skip = (page - 1) * limit;
    let category = params.category;

    // Step 2: Querying
    await connectMongoose();
    let dataQuery = {
      $or: [{ "category.slug": category }, { "subcategory.slug": category }],
    };
    let books = await Book.find(dataQuery)
      .select("title author slug cover subcategory category cloudinaryId")
      .skip(skip)
      .limit(limit)
      .exec();
    books = JSON.parse(JSON.stringify(books));

    let total = await Book.countDocuments(dataQuery).exec();

    // Step 3: Calculate current page
    let nbOfPages = Math.ceil(total / limit);
    let pages = [];
    for (let i = 1; i <= nbOfPages; i++) {
      if (i <= 3 || nbOfPages - i < 3 || i == page) {
        if (i === nbOfPages) {
          pages.push({
            page: i,
            first: (i - 1) * limit + 1,
            last: total,
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

    return {
      props: {
        category,
        books,
        pages,
        total,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
export default CategoryPage;
