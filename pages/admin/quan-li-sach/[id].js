import React from "react";
import AdminLayout from "../../../components/Layout/AdminLayout";
import styled from "styled-components";

import connectMongoose from "../../../database/initMongoose";
import Book from "../../../database/bookModel";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";

import AdminBookInfosForm from "../../../components/forms/AdminBookInfosForm";
import AdminBookPricingForm from "../../../components/forms/AdminBookPricingForm";

const StyledPage = styled.div`
  ${({ theme }) => theme.maxWidths.desktop};

  .panel {
    ${({ theme }) => theme.shadow.xs};
    border: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
    ${({ theme }) => theme.borderRadius["rounded"]};
    background-color: white;
    min-height: 5rem;
    margin-bottom: ${({ theme }) => theme.spacing["4"]};

    .panel__content {
      padding: ${({ theme }) => `${theme.spacing["4"]} ${theme.spacing["8"]}`};
    }

    .panel__heading {
      padding: ${({ theme }) =>
        `${theme.spacing["6"]} ${theme.spacing["8"]} 0`};
      /* border-bottom: ${({ theme }) =>
        `1px solid ${theme.colors.border.default}`}; */

      .panel__heading-title {
        font-weight: 600;
        color: ${({ theme }) => theme.colors.gray["200"]};
      }

      .panel__heading-subtitle {
        margin-top: ${({ theme }) => theme.spacing["2"]};
        font-family: ${({ theme }) => theme.fonts.serif};
        color: ${({ theme }) => theme.colors.gray["300"]};
      }
    }

    .panel__billing {
      border-top: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
      padding: ${({ theme }) => `${theme.spacing["4"]} ${theme.spacing["6"]}`};

      p span:nth-child(2) {
        font-weight: 600;
      }
    }
  }

  .two-columns {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-column-gap: ${({ theme }) => theme.spacing["8"]};
  }

  .top-heading {
    padding: ${({ theme }) => `${theme.spacing["4"]} 0`};

    .top-heading__back-button-container {
      margin-bottom: ${({ theme }) => theme.spacing["2"]};
      button.top-heading__back-button {
        color: ${({ theme }) => theme.colors.gray["400"]};
        padding: ${({ theme }) =>
          `${theme.spacing["3"]} ${theme.spacing["2"]}`};
        display: flex;
        align-items: center;
        svg {
          margin-right: ${({ theme }) => theme.spacing["1"]};
        }

        &:hover,
        &:active {
          color: ${({ theme }) => theme.colors.gray["200"]};
        }
      }
    }
    h3.top-heading__id-and-date {
      span:nth-child(1) {
        font-weight: 600;
        margin-right: ${({ theme }) => theme.spacing["4"]};
      }
      span:nth-child(2) {
        font-size: 1rem;
      }
    }
  }

  .items {
    .items__item {
      border: 1px solid green;
      padding: ${({ theme }) => `${theme.spacing["4"]} ${theme.spacing["6"]}`};
    }
  }
`;

const BookSinglePage = ({ book, authors, presshouses, publishers }) => {
  const router = useRouter();

  return (
    <AdminLayout useDefaultHeader={false}>
      <StyledPage>
        <div className="top-navigation"></div>
        <div className="top-heading">
          <div className="top-heading__back-button-container">
            <button
              className="top-heading__back-button"
              onClick={() => router.back()}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
              Quay Lại
            </button>
          </div>
          <h3 className="top-heading__id-and-date">
            {book.title}
            {/* <span>
              {"#" +
                _id.substring(0, 6) +
                "..." +
                _id.substring(_id.length - 6)} */}
            {/* </span> */}
            {/* <span>{intlDate}</span> */}
          </h3>
        </div>
        <div className="two-columns">
          <div className="main-col">
            <section className="items panel">
              {/* <div className="panel__heading">
                <h6 className="panel__heading-title">Thông Tin Sách</h6>
              </div> */}
              <div className="panel__content">
                <AdminBookInfosForm
                  book={book}
                  authors={authors}
                  publishers={publishers}
                  presshouses={presshouses}
                />
              </div>
            </section>
            <section className="pricing panel">
              <div className="panel__heading">
                <h6 className="panel__heading-title">Giá Thành</h6>
              </div>
              <div className="panel__content">
                <AdminBookPricingForm
                  book={book}
                  authors={authors}
                  publishers={publishers}
                  presshouses={presshouses}
                />
              </div>
            </section>
            <section className="delivery panel">
              <div className="panel__heading">
                <h6 className="panel__heading-title">Giao Hàng</h6>
              </div>
            </section>
          </div>
          <div className="side-col">
            <section className="note panel">
              <div className="panel__heading">
                <h6 className="panel__heading-title">Lời Nhắn</h6>
              </div>
            </section>
            <section className="customer panel">
              <div className="panel__heading">
                <h6 className="panel__heading-title">Khách Hàng</h6>
              </div>
            </section>
          </div>
        </div>
      </StyledPage>
    </AdminLayout>
  );
};

export async function getServerSideProps(context) {
  try {
    // console.log(context.params);
    // context.params.id = "5f07cc28d5a6471a36ad7c0c";

    await connectMongoose();

    let book = await Book.findById(context.params.id);

    let authors = await Book.distinct("author").exec();

    let presshouses = await Book.distinct("presshouse").exec();

    let publishers = await Book.distinct("publisher").exec();

    if (!book) {
      return { props: {} };
    }

    return {
      props: {
        book: JSON.parse(JSON.stringify(book)),
        authors,
        publishers,
        presshouses,
      },
    };
  } catch (error) {
    console.log(error);
  }
}

export default BookSinglePage;
