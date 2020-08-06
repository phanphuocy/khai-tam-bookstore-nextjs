import React, { useState } from "react";
import styled from "styled-components";
import client, { urlFor } from "../../../database/sanity";
import Header from "../../../components/Navigation/Header";
import Footer from "../../../components/Navigation/Footer";
import BooksGrid from "../../../components/grids/BooksGrid";
import connectMongoose from "../../../database/initMongoose";
import Book from "../../../database/bookModel";
import Link from "next/link";
import Sticky from "react-stickynode";
import authorLinks from "../../../constants/authors-links";

const StyledPage = styled.div`
  padding: ${({ theme }) => `${theme.spacing["8"]} ${theme.spacing["4"]}`};
  background-color: ${({ theme }) => theme.colors.neutral.behrSnowTint2};

  .page {
    ${({ theme }) => theme.maxWidths.desktop};
    display: flex;

    .page__aside {
      flex-basis: 25%;
      flex-shrink: 0;
    }

    .page__main {
      padding: ${({ theme }) => `${theme.spacing["4"]} ${theme.spacing["4"]}`};
    }
  }
`;

const AuthorsPage = ({ author }) => {
  return (
    <>
      <Header />
      <StyledPage>
        <div className="page">
          <div className="page__main">
            <h1>{author.name}</h1>
            <p>{author.description ? author.description : ".."}</p>
            <BooksGrid books={author.books} view="chi-tiet" />
          </div>
          <aside className="page__aside">
            {/* <Sticky enabled={true} top={50} bottomBoundary={1200}>
              <div className="page__nav-container">
                {authorLinks.map((grp) => (
                  <Link href="/tac-gia/[group]" as={`/tac-gia/${grp.value}`}>
                    <a
                      className={`page__nav-item ${
                        grp.value === currGroup ? "active" : ""
                      }`}
                    >
                      {grp.label}
                    </a>
                  </Link>
                ))}
              </div>
            </Sticky> */}
          </aside>
        </div>
      </StyledPage>
      <Footer />
    </>
  );
};

export async function getStaticPaths() {
  let authors = await client.fetch(
    `*[_type == "author"]{ _id, slug, title, group }`
  );
  let paths = authors.map((author) => ({
    params: {
      group: author.group,
      slug: author.slug.current,
    },
  }));
  //   console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let author = await client.fetch(
    `*[_type == "author" && slug.current == $slug][0]`,
    {
      slug: params.slug,
    }
  );

  await connectMongoose();
  let books = await Book.find({ author: author.name }).select(
    "title slug cover category subcategory"
  );
  author.books = JSON.parse(JSON.stringify(books));

  return {
    props: {
      author,
    },
  };
}

export default AuthorsPage;
