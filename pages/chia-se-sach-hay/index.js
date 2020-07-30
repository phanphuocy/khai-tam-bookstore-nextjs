import React from "react";
import Header from "../../components/Navigation/Header";
import Footer from "../../components/Navigation/Footer";
import styled from "styled-components";
import { useViewportScroll, motion, useTransform } from "framer-motion";
import client, { urlFor } from "../../database/sanity";

import Link from "next/link";

const StyledPage = styled.div`
  background-color: white;
  scroll-behavior: smooth;

  .heading {
    height: 75vh;
    overflow: hidden;
    /* height: 80vh;
    background-image: url("bg-images/jason-leung-89KfKyqh6dY-unsplash.jpg");
    background-size: cover;
    background-position: 50; */

    position: relative;
    .heading__image-cover {
      height: 160%;
      position: relative;
      top: -20%;
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
      flex-direction: column;
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
    ${({ theme }) => theme.maxWidths.desktop};

    .list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: ${({ theme }) => theme.spacing["8"]};
      padding: ${({ theme: { spacing } }) => `${spacing["8"]} ${spacing["4"]}`};

      .list__item {
      }
    }
  }

  .card {
    img.card__image {
      border-radius: 0.5rem;
    }
    .card__dateCreated {
      padding: ${({ theme: { spacing } }) =>
        `${spacing["2"]} ${spacing["4"]} ${spacing["1"]}`};
      color: ${({ theme }) => theme.colors.green["500"]};
    }
    .card__title {
      font-size: ${({ theme }) => theme.fontSizes.md};
      padding: ${({ theme: { spacing } }) => `${spacing["1"]} ${spacing["4"]}`};
      font-family: ${({ theme }) => theme.fonts.serif};
      font-weight: 600;
    }
  }
`;

const BookSharingPage = ({ posts }) => {
  const { scrollY } = useViewportScroll();
  const bgImageParalax = useTransform(scrollY, (value) => value * 0.5);

  return (
    <>
      <Header showPhoneNumbers={false} />

      <StyledPage>
        <div className="heading">
          <picture className="heading__image-cover" alt="Banner" width="100%">
            <source
              srcSet={require("../../public/bg-images/jason-leung-89KfKyqh6dY-unsplash.jpg?webp")}
              type="image/webp"
            />
            <motion.img
              style={{ y: bgImageParalax }}
              src={require("../../public/bg-images/jason-leung-89KfKyqh6dY-unsplash.jpg")}
            />
          </picture>
          {/* <motion.img
            style={{ y: bgImageParalax }}
            className="heading__image-cover"
            src={require("../../public/bg-images/jason-leung-89KfKyqh6dY-unsplash.jpg")}
            alt="Banner"
            width="100%"
          /> */}
          <div className="heading__title">
            <h1 className="heading__title-label">Chia Sẻ Sách Hay</h1>
            <Link href="/chia-se-sach-hay#posts">
              <a>Scroll</a>
            </Link>
          </div>
        </div>
        <div className="content">
          <ul className="list" id="posts">
            {posts.map((post) => (
              <li className="list__item card">
                <Link
                  href="/chia-se-sach-hay/[slug]"
                  as={`/chia-se-sach-hay/${post.slug.current}`}
                >
                  <a>
                    <img
                      className="card__image"
                      src={urlFor(post.coverImage).width(496).height(300)}
                      width="100%"
                    />
                    <p className="card__dateCreated">
                      {new Intl.DateTimeFormat("vi-VN").format(
                        new Date(post._createdAt)
                      )}
                    </p>
                    <h2 className="card__title">{post.title}</h2>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </StyledPage>
      <Footer />
    </>
  );
};

export async function getStaticProps(context) {
  let data = await client.fetch(`*[_type == "bookReview"]`);

  return {
    props: {
      posts: data,
    },
  };
}

export default BookSharingPage;
