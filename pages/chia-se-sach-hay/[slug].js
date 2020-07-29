import React from "react";
import Header from "../../components/Navigation/Header";
import Footer from "../../components/Navigation/Footer";
import styled from "styled-components";
import imageUrlBuilder from "@sanity/image-url";

import client from "../../database/sanity";
import fs from "fs";

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const StyledPage = styled.div`
  .heading {
    position: relative;
    .heading__image-cover {
      object-fit: cover;
      object-position: center;
    }

    .heading__title {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      .heading__title-label {
        font-family: ${({ theme }) => theme.fonts.serif};
        padding: ${({ theme: { spacing } }) =>
          `${spacing["6"]} ${spacing["8"]}`};
        background-color: ${({ theme }) => theme.colors.green["400"]};
        color: ${({ theme }) => theme.colors.gray["900"]};
      }
    }
  }

  .content {
    min-height: 10rem;
  }
`;

const BookSharingPage = ({ post }) => {
  return (
    <>
      <Header showPhoneNumbers={false} />
      <StyledPage>
        <div className="heading">
          <img
            className="heading__image-cover"
            src={urlFor(post.coverImage)}
            alt="Banner"
            width="100%"
            height="360px"
          />
          <div className="heading__title">
            <h1 className="heading__title-label">Chia Sẻ Sách Hay</h1>
          </div>
        </div>
        <div className="content"></div>
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
  console.log("SLUG", slug);
  let data = await client.fetch(
    `*[_type == "bookReview" && slug.current == $slug][0]`,
    {
      slug,
    }
  );
  console.log(data);
  return {
    props: {
      post: data,
    },
  };
}

export default BookSharingPage;
