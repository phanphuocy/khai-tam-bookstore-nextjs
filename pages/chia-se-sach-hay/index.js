import React from "react";
import Header from "../../components/Navigation/Header";
import Footer from "../../components/Navigation/Footer";
import styled from "styled-components";

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

const BookSharingPage = () => {
  return (
    <>
      <Header showPhoneNumbers={false} />
      <StyledPage>
        <div className="heading">
          <img
            className="heading__image-cover"
            src="bg-images/rigel-qu8Xjs5cZ4c-unsplash.jpg"
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

export default BookSharingPage;
