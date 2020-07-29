import React from "react";
import Header from "../../components/Navigation/Header";
import Footer from "../../components/Navigation/Footer";
import styled from "styled-components";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";

import client from "../../database/sanity";
import fs from "fs";

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const StyledPage = styled.div`
  background-color: white;
  .heading {
    position: relative;

    .heading__image-cover {
      object-fit: cover;
      object-position: center;
    }

    .heading__details {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;

      .heading__details-wraper {
        ${({ theme }) => theme.maxWidths.desktop};
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        .heading__details-title {
          color: white;
          font-family: ${({ theme }) => theme.fonts.sans};
        }
        .heading__details-subtitle {
          color: ${({ theme }) => theme.colors.gray["700"]};
          font-family: ${({ theme }) => theme.fonts.serif};
          font-size: ${({ theme }) => theme.fontSizes.md};
        }
        .heading__details-dateCreated {
          height: 3rem;
          transform: translateY(1.5rem);
          display: flex;
          align-items: stretch;

          p {
            width: 100%;
            height: 100%;
            color: white;
            background-color: ${({ theme }) => theme.colors.green["400"]};
            display: inline-flex;
            align-items: center;
            padding: ${({ theme }) => `0 ${theme.spacing["4"]}`};
          }
        }
      }
    }

    .heading__mask {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgb(43, 43, 43);
      background: linear-gradient(
        0deg,
        rgba(43, 43, 43, 0.4682247899159664) 0%,
        rgba(255, 255, 255, 0) 37%
      );
    }
  }

  .content {
    min-height: 10rem;
    ${({ theme }) => theme.maxWidths.desktop};
    padding-top: ${({ theme }) => theme.spacing["12"]};
    padding-bottom: ${({ theme }) => theme.spacing["12"]};
    display: flex;

    .content__main {
      flex-basis: 60%;
      padding-right: ${({ theme }) => theme.spacing["8"]};
      border-right: ${({ theme }) =>
        `1px solid ${theme.colors.border.default}`};
    }
  }

  article.article {
    p {
      font-size: ${({ theme }) => theme.fontSizes.md};
      font-family: ${({ theme }) => theme.fonts.serif};
      line-height: 1.44;
      margin-bottom: ${({ theme }) => theme.spacing["4"]};
    }
  }
`;

const BookSharingPage = ({ post }) => {
  const {
    title = "Missing title",
    coverImage,
    subtitle,
    body = [],
    _createdAt,
  } = post;

  return (
    <>
      <Header showPhoneNumbers={false} />
      <StyledPage>
        <div className="heading">
          <img
            className="heading__image-cover"
            src={urlFor(coverImage).width(1920).height(360)}
            alt="Banner"
            width="100%"
            height="360px"
          />

          <div className="heading__mask"></div>
          <div className="heading__details">
            <div className="heading__details-wraper">
              <h1 className="heading__details-title">{title}</h1>
              <h2 className="heading__details-subtitle">{subtitle}</h2>
              <div className="heading__details-dateCreated">
                <p>
                  Đăng ngày{" "}
                  {new Intl.DateTimeFormat("vi-VN").format(
                    new Date(_createdAt)
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <article className="article content__main">
            <BlockContent
              blocks={body}
              imageOptions={{ w: 320, h: 240, fit: "max" }}
              {...client.config()}
            />
          </article>
        </div>
      </StyledPage>
      <Footer />
    </>
  );
};

const cacheTolerance = 300000; // 5 minutes

export async function getStaticPaths() {
  const cachePath = "database/chia-se-sach-hay-paths.json";

  if (fs.existsSync(cachePath)) {
    let file = JSON.parse(fs.readFileSync(cachePath), { encoding: "utf8" });
    if (Date.now() - file.time < cacheTolerance) {
      console.log("Serve paths from storage");
      return {
        paths: file.data,
        fallback: false,
      };
    } else {
      fs.unlinkSync(cachePath);
    }
  }

  let allPostSlugs = await client.fetch(`
  *[_type == "bookReview"]{  slug }`);

  let paths = allPostSlugs.map((post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  fs.writeFileSync(
    cachePath,
    JSON.stringify(
      {
        time: Date.now(),
        data: paths,
      },
      null,
      2
    ),
    { encoding: "utf8" }
  );

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug = "" } = params;
  let data = await client.fetch(
    `*[_type == "bookReview" && slug.current == $slug][0]`,
    {
      slug,
    }
  );
  // console.log(data);
  return {
    props: {
      post: data,
    },
  };
}

export default BookSharingPage;
