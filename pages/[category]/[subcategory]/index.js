import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import fs from "fs";

// Import custom components
import Header from "../../../components/Navigation/Header";
import ThreeSectionsLayout from "../../../components/Categories/ThreeSectionsLayout";
import { useRouter } from "next/router";
import BooksGrid from "../../../components/grids/BooksGrid";

const StyledPage = styled.main`
${({ theme }) => theme.backgrounds.woodTexture};
 padding: ${({ theme }) => `${theme.spacing["8"]} 0`};

  .container {
    ${({ theme }) => theme.maxWidths.laptop};
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

const CategoryPage = ({ data, category, subcategory }) => {
  const router = useRouter();

  const [page, setPage] = useState(
    router.query.page && router.query.page > 1 ? router.query.page : 1
  );

  let limit = 24;
  let nbOfPages = Math.ceil(data.books.length / limit);
  let pages = [];
  for (let i = 1; i <= nbOfPages; i++) {
    if (i === nbOfPages) {
      pages.push({ page: i, first: (i - 1) * limit, last: data.books.length });
    } else {
      pages.push({ page: i, first: (i - 1) * limit, last: i * limit });
    }
  }

  console.log("PAGES", pages);
  const [displaying, setDisplaying] = useState(new Array(limit));

  useEffect(() => {
    setDisplaying(data.books.slice((page - 1) * limit, page * limit));
  }, [page]);

  return (
    <>
      <Header />
      <StyledPage>
        <ThreeSectionsLayout>
          <div className="content-header">
            <p>{`Tìm Được ${data.books.length} Đầu Sách, Hiển Thị ${limit}, Trang ${page}`}</p>
          </div>
          <BooksGrid books={displaying} />
          <div className="content-pagination">
            <ul>
              {pages.map((el) => (
                <li>
                  <Link
                    href="/[category]/[subcategory]"
                    as={`/${category}/${subcategory}?page=${el.page}`}
                  >
                    <a>{el.page}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </ThreeSectionsLayout>
      </StyledPage>
    </>
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
      category,
      subcategory,
    },
  };
}

export default CategoryPage;
