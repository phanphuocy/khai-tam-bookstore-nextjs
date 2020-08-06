import React from "react";
import AdminLayout from "../../../components/Layout/AdminLayout";
import styled from "styled-components";

import connectMongoose from "../../../database/initMongoose";
import Review from "../../../database/reviewModel";
import { useRouter } from "next/router";

import AdminBackButton from "../../../components/Navigation/AdminBackButton";

const StyledPage = styled.div`
  ${({ theme }) => theme.maxWidths.laptop};

  .panel {
    ${({ theme }) => theme.shadow.xs};
    border: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
    ${({ theme }) => theme.borderRadius["rounded"]};
    background-color: white;
    min-height: 5rem;
    margin-bottom: ${({ theme }) => theme.spacing["4"]};

    .panel__heading {
      padding: ${({ theme }) => `${theme.spacing["4"]} ${theme.spacing["6"]}`};
      border-bottom: ${({ theme }) =>
        `1px solid ${theme.colors.border.default}`};

      .panel__heading-title {
        font-weight: 600;
        color: ${({ theme }) => theme.colors.gray["300"]};
      }

      .panel__heading-subtitle {
        margin-top: ${({ theme }) => theme.spacing["2"]};
        font-family: ${({ theme }) => theme.fonts.serif};
        color: ${({ theme }) => theme.colors.gray["300"]};
      }
    }

    .panel__content {
      padding: ${({ theme }) => `${theme.spacing["4"]} ${theme.spacing["6"]}`};

      p {
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
`;

const OrderSinglePage = ({ review }) => {
  const router = useRouter();

  const { _id, createdAt, title, body, book, user } = review;

  var intlOption = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    dayPeriod: "short",
  };

  const intlDate = new Intl.DateTimeFormat("vi-VN", intlOption).format(
    new Date(createdAt)
  );

  return (
    <AdminLayout useDefaultHeader={false}>
      <StyledPage>
        <div className="top-navigation"></div>
        <div className="top-heading">
          <AdminBackButton />
          <h3 className="top-heading__id-and-date">
            <span>
              {"#" +
                _id.substring(0, 6) +
                "..." +
                _id.substring(_id.length - 6)}
            </span>
            <span>{intlDate}</span>
          </h3>
        </div>
        <div className="two-columns">
          <div className="main-col">
            <section className="info panel">
              <div className="panel__heading">
                <h6 className="panel__heading-title">{title}</h6>
              </div>
              <div className="panel__content">
                <p>{body}</p>
              </div>
            </section>
          </div>
          <div className="side-col"></div>
        </div>
      </StyledPage>
    </AdminLayout>
  );
};

export async function getServerSideProps(context) {
  try {
    await connectMongoose();

    let review = await Review.findById(context.params.id);

    if (!review) {
      return { props: {} };
    }

    return {
      props: { review: JSON.parse(JSON.stringify(review)) },
    };
  } catch (error) {
    console.log(error);
  }
}

export default OrderSinglePage;
