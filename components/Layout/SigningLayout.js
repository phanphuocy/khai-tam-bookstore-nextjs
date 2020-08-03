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
    background-color: ${({ theme }) => theme.colors.gray["800"]};
    background-image: ${(props) => `url(${props.bgUrl})`};
    background-position: center;
    background-size: cover;

    padding: ${({ theme }) => `${theme.spacing["8"]} ${theme.spacing["16"]}`};

    .credit-image {
      color: white;
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

const SigningLayout = ({ children, bgUrl }) => {
  return (
    <StyledLayout bgUrl={bgUrl}>
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
            <small>Credit Ảnh: @michael-hull</small>
          </p>
        </div>
      </motion.div>
    </StyledLayout>
  );
};

SigningLayout.defaultProps = {
  bgUrl: "images/michael-hull-UdvXJ95Yqt8-unsplash.jpg",
};

export default SigningLayout;
