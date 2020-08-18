import React from "react";
import Header from "../components/Navigation/Header";
import styled from "styled-components";
import Footer from "../components/Navigation/Footer";
import connectMongoose from "../database/initMongoose";
import Book from "../database/bookModel";
import OneMainTwoSidebars from "../components/Layout/OneMainTwoSidebars";
import { useRouter } from "next/router";
import BookGrid from "../components/grids/BooksGrid";
import Pagination from "../components/Navigation/Pagination";

const StyledPage = styled.div`
  ${({ theme }) => theme.maxWidths.laptop};
  padding: ${({ theme: { spacing } }) => `${spacing["12"]} 0`};

  .container {
    display: flex;
    .container__side {
      flex: 25% 0 1;
    }

    .container__main {
      flex: 75% 0 1;
    }
  }

  .main {
    .main__heading {
      .main__heading-label {
        font-family: ${({ theme }) => theme.fonts.serif};
        font-weight: bold;
        margin-bottom: ${({ theme: { spacing } }) => spacing["4"]};
      }
    }

    .main__content {
      ul {
        /* display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: ${({ theme: { spacing } }) => spacing["2"]}; */
      }
    }

    .book-row {
      display: flex;
      padding: ${({ theme: { spacing } }) => `${spacing["3"]} ${spacing["4"]}`};
      border-bottom: ${({ theme }) =>
        `1px solid ${theme.colors.border.default}`};

      &:hover {
        background-color: white;
        ${({ theme }) => theme.shadow.base};
      }

      .book-row__cover {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 8rem;
        height: 11rem;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      .book-row-info {
      }
    }
  }
`;

const SearchPage = ({ foundBooks, totalBooks, limit, page, filters }) => {
  const router = useRouter();

  if (!router.query.q || !foundBooks) {
    return (
      <>
        <Header />
        QQ
      </>
    );
  }

  const Categories = (filters) => (
    <ul>
      {filters.categories.map((cate) => (
        <li key={cate._id.slug}>
          <a>
            <span>{cate._id.name}</span>
            <span>({cate.count})</span>
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <Header />
      <OneMainTwoSidebars
        sideLabel1="Danh Mục"
        sideComponent1={Categories(filters)}
      >
        <StyledPage>
          <div className="container__main main">
            <div className="main__heading">
              <h4 className="main__heading-label">
                Tìm thấy {totalBooks} kết quả cho "{decodeURI(router.query.q)}"
              </h4>
              <p>Hiển thị từ 1 - {foundBooks.length}</p>
              <p>Trang {page}</p>
            </div>
            <div className="main__content">
              <BookGrid books={foundBooks} />
            </div>
            <Pagination
              total={totalBooks}
              curr={page}
              routerPathname={router.pathname}
              routerQuery={router.query}
            />
          </div>
        </StyledPage>
      </OneMainTwoSidebars>
      <Footer />
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    await connectMongoose();
    let limit = 24;
    let page = context.query.page ? context.query.page : 1;

    let searchQuery = new RegExp(decodeURI(context.query.q), "gi");
    console.log("SEARCH:", searchQuery);
    let projection = {
      $or: [{ title: searchQuery }, { author: searchQuery }],
    };

    const totalBooks = await Book.countDocuments(projection).exec();

    let foundBooks = await Book.find(projection)
      .limit(limit)
      .skip((page - 1 < 0 ? 0 : page - 1) * limit);

    let authorFilters = await Book.aggregate([
      {
        $match: {
          $and: [
            { $or: [{ title: searchQuery }, { author: searchQuery }] },
            { author: { $exists: true, $ne: null } },
          ],
        },
      },
      { $sortByCount: "$author" },
      { $limit: 5 },
    ]);

    let publisherFilters = await Book.aggregate([
      {
        $match: {
          $and: [
            { $or: [{ title: searchQuery }, { author: searchQuery }] },
            { publisher: { $exists: true, $ne: null } },
          ],
        },
      },
      { $sortByCount: "$publisher" },
      { $limit: 5 },
    ]);

    let presshouseFilters = await Book.aggregate([
      {
        $match: {
          $and: [
            { $or: [{ title: searchQuery }, { author: searchQuery }] },
            { presshouse: { $exists: true, $ne: null } },
          ],
        },
      },
      { $sortByCount: "$presshouse" },
      { $limit: 5 },
    ]);

    let categoryFilters = await Book.aggregate([
      {
        $match: {
          $and: [
            { $or: [{ title: searchQuery }, { author: searchQuery }] },
            { "category.slug": { $exists: true, $ne: null } },
          ],
        },
      },
      { $sortByCount: "$category" },
      { $limit: 5 },
    ]);

    let filters = {
      authors: authorFilters,
      publishers: publisherFilters,
      presshouses: presshouseFilters,
      categories: categoryFilters,
    };

    return {
      props: {
        foundBooks: JSON.parse(JSON.stringify(foundBooks)),
        totalBooks: totalBooks,
        limit,
        page,
        filters,
      }, // will be passed to the page component as props
    };
  } catch (err) {
    console.log(err);
  }
}

export default SearchPage;
