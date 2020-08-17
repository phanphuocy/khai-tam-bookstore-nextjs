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
  background-color: ${({ theme }) => theme.colors.neutral["800"]};

  .page {
    ${({ theme }) => theme.maxWidths.desktop};
    display: flex;
    flex-direction: row-reverse;

    ${({ theme }) => theme.breakpoints.sm} {
      flex-direction: column;

      div.page__main {
        padding: 0;
        border-top:${({ theme }) => `1px solid ${theme.colors.neutral["400"]}`};
      }
    }

    .page__nav {
      flex-basis: 25%;
      flex-shrink: 0;
      padding: ${({ theme }) => `${theme.spacing["4"]} ${theme.spacing["4"]}`};
      border-left: ${({ theme }) => `1px solid ${theme.colors.border.default}`};

      .page__nav-container {
        display: flex;
        flex-direction: column;
        .page__nav-item {
          border-bottom: ${({ theme }) =>
            `1px solid ${theme.colors.border.default}`};
          padding:${({ theme }) =>
            `${theme.spacing["2"]} ${theme.spacing["2"]}`};

          &.active {
            background-color:${({ theme }) => theme.colors.green["500"]};
            color:${({ theme }) => theme.colors.neutral["900"]};
          }
        }
      }
    }

    .page__main {
      flex-basis: 75%;
      padding: ${({ theme }) => `${theme.spacing["4"]} ${theme.spacing["4"]}`};
      z-index: 10;
      background-color:${({ theme }) => theme.colors.neutral["800"]};
      ul.page__main-content {
      }
    }
  }

  .author-row {
    padding: ${({ theme }) => `${theme.spacing["4"]} 0`};
    margin-bottom: ${({ theme }) => theme.spacing["4"]};
    display: flex;

    ${({ theme }) => theme.breakpoints.sm} {
      flex-direction: column;
      
      .author-row__desc {
        padding:${({ theme }) =>
          `${theme.spacing["3"]} ${theme.spacing["4"]}`} !important;
      }
    }

    .author-row__heading {
      align-self: flex-start;        
      display: flex;
      align-items: center;
      padding: ${({ theme }) =>
        `0 ${theme.spacing["4"]} ${theme.spacing["2"]}`};

      .author-row__heading-avatar {
        margin-right: ${({ theme }) => theme.spacing["4"]};
        img {
          ${({ theme }) => theme.borderRadius["rounded-full"]};
        }
      }
    }
    .author-row__desc {
      flex-basis: 75%;
      border-left: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
      background-color: white;
      /* border: ${({ theme }) =>
        `1px solid ${theme.colors.border.default}`}; */
      padding: ${({ theme }) => `${theme.spacing["6"]} ${theme.spacing["8"]}`};

      .author-row__heading-name {
        font-family: ${({ theme }) => theme.fonts.title};
      }
    }
  }

  .decorated-bg {
      padding: 0.5rem;
      ${({ theme }) => theme.backgrounds.bambooTexture};
      ${({ theme }) => theme.borderRadius["rounded-full"]};

      div {
          padding: 0.25rem;
          background-color: ${({ theme }) =>
            theme.colors.neutral.behrSnowTint2};
         ${({ theme }) => theme.borderRadius["rounded-full"]};
      }
  }
`;

const AuthorsPage = ({ authors, currGroup }) => {
  return (
    <>
      <Header />
      <StyledPage>
        <div className="page">
          <nav className="page__nav">
            <Sticky enabled={true} top={50} bottomBoundary={1200}>
              <div className="page__nav-container">
                {authorLinks.map((grp) => (
                  <Link
                    href="/tac-gia/[group]"
                    as={`/tac-gia/${grp.value}`}
                    key={grp.value}
                  >
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
            </Sticky>
          </nav>
          <div className="page__main">
            {/* <h1 className="page__main-heading">{names[selected]}</h1> */}
            <ul className="page__main-content">
              {authors.map((author) => (
                <li className="author-row" key={author.slug}>
                  <div className="author-row__heading">
                    <div className="author-row__heading-avatar">
                      <div className="decorated-bg">
                        <div>
                          <img
                            src={urlFor(author.image).width(120).height(120)}
                            alt={author.name + "avatar"}
                            width="120px"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="author-row__desc">
                    <div>
                      <h2 className="author-row__heading-name">
                        <Link
                          href="/tac-gia/[group]/[slug]"
                          as={`/tac-gia/${author.group}/${author.slug.current}`}
                        >
                          <a>{author.name}</a>
                        </Link>
                      </h2>
                    </div>
                    <p>
                      {author.description
                        ? author.description
                        : "Đang cập nhập thêm thông tin"}
                    </p>
                    <h6>Các tác phẩm</h6>
                    <div style={{ height: "1rem" }}></div>
                    <ul className="author-row__works">
                      {author.books.map((book) => (
                        <li key={book.slug}>{book.title}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </StyledPage>
      <Footer />
    </>
  );
};

export async function getStaticPaths() {
  let authors = await client.fetch(`*[_type == "author"]`);
  let groups = Array.from(new Set(authors.map((el) => el.group)));
  let paths = groups.map((grp) => ({
    params: {
      group: grp,
    },
  }));
  // console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let authors = await client.fetch(`*[_type == "author" && group == $group]`, {
    group: params.group,
  });

  await connectMongoose();

  for (let i = 0; i < authors.length; i++) {
    let books = await Book.find({ author: authors[i].name })
      .select("title slug cover category subcategory")
      .limit(3);
    authors[i].books = JSON.parse(JSON.stringify(books));
  }
  return {
    props: {
      authors,
      currGroup: params.group,
    },
  };
}

export default AuthorsPage;
