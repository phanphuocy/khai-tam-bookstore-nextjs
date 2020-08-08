import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { motion } from "framer-motion";

const StyledLayout = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 40rem 7fr;
  grid-template-rows: 1fr;

  .col__illustration {
    /* position: relative; */
    padding: ${({ theme }) => `${theme.spacing["8"]} ${theme.spacing["16"]}`};

    .credit-image {
      position: relative;
      z-index: 10;
      color: white;
    }

    .bg-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      object-fit: cover;
    }
  }
  .col__util-space {
    background-color: white;
    border-right: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
  }

  .col__main {
    background-color: white;
    max-width: 50rem;
    width: 100%;
    margin: 0 auto;
    min-height: 4rem;

    .header {
      padding: ${({ theme }) => `0 0 ${theme.spacing["4"]}`};

      .big-title {
        font-family: ${({ theme }) => theme.fonts.serif};
        margin-bottom: ${({ theme }) => theme.spacing["2"]};
      }
    }
  }

  .main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: ${({ theme: { spacing } }) => `${spacing["4"]} ${spacing["6"]}`};

    .main__heading {
      padding-bottom: ${({ theme }) => theme.spacing["4"]};
    }

    .main__heading,
    .main__footer {
      min-height: 4rem;
    }

    .main__content {
      padding: ${({ theme }) => `0 ${theme.spacing["4"]}`};
    }
  }
`;

const SigningLayout = ({ children, bgId, bgCredit }) => {
  return (
    <StyledLayout>
      <div className="col__util-space"></div>
      <div className="col__main main">
        <header className="main__heading">
          <div className="logo-container">
            <Link href="/">
              <a>
                <img
                  src={require("../../public/brand-images/logo.png")}
                  alt="Logotype Khai Tam"
                  width="200px"
                />
              </a>
            </Link>
          </div>
        </header>
        <div className="main__content">{children}</div>
        <footer className="main__footer">@2020</footer>
      </div>
      <motion.div
        className="col__illustration"
        initial={{ filter: "grayscale(1)" }}
        animate={{ filter: "grayscale(0)" }}
        transition={{
          duration: 1,
        }}
      >
        <div className="credit-image">
          <p>
            <small>Credit Ảnh: @{bgCredit}</small>
          </p>
        </div>
        <picture>
          <source
            srcSet={`https://res.cloudinary.com/khaitam/image/upload/w_1280/v1596888314/${bgId}.webp`}
            type="image/webp"
          />
          <source
            srcSet={`https://res.cloudinary.com/khaitam/image/upload/w_1280/v1596888314/${bgId}.jpg`}
            type="image/jpg"
          />
          <img
            className="bg-image"
            src={`https://res.cloudinary.com/khaitam/image/upload/w_1280/v1596888314/${bgId}.jpg`}
            alt="Background image"
            width="100%"
          />
        </picture>
      </motion.div>
    </StyledLayout>
  );
};

SigningLayout.defaultProps = {
  bgId: "hisu-lee-SrkuyPb3aUk-unsplash_rilrpb",
  bgCredit: "hisu-lee",
};

export default SigningLayout;
