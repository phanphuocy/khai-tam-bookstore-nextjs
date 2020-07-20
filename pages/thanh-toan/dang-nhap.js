import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Header from "../../components/Navigation/Header";

const StyledPage = styled.main`
  .container {
    padding: ${({ theme }) => `${theme.spacing["8"]} 0`};
    ${({ theme }) => theme.maxWidths.laptop};

    display: grid;
    grid-template-columns: 7fr 4rem 5fr;
    grid-template-rows: 1fr;

    .option {
      ${({ theme }) => theme.borderRadius["rounded"]};
      ${({ theme }) => theme.shadow["base"]};
      background-color: white;
      min-height: 10rem;

      .option-heading {
        padding: ${({ theme }) =>
          `${theme.spacing["8"]} ${theme.spacing["6"]} ${theme.spacing["4"]}`};
        border-bottom: 3px solid lightgray;
        text-align: center;

        .heading-text {
          /* margin-bottom: ${({ theme }) => theme.spacing["2"]}; */
        }
        p {
          color: ${({ theme }) => theme.colors.gray["300"]};
        }
      }

      .option-content {
        padding: ${({ theme }) =>
          `${theme.spacing["8"]} ${theme.spacing["12"]}`};

          a.link-as-btn {
            background-color:${({ theme }) => theme.colors.green["500"]};
            padding:${({ theme }) => theme.spacing["3"]};
          }
      }
    }

    .spacing-for-options {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr auto 1fr;

      .spacing-line {
        justify-self: center;
        width: 2px;
        background-color: rgba(0, 0, 0, 0.05);
        height: 100%;
      }
      .spacing-label {
        justify-self: center;
        color: ${({ theme }) => theme.colors.gray["300"]};
        padding: ${({ theme }) => `${theme.spacing["2"]} 0`};
      }
    }
  }
`;

const CheckoutStep1Page = () => {
  return (
    <>
      <Header />
      <StyledPage>
        <div className="container">
          <div className="option-signin option">
            <div className="option-heading">
              <h3 className="heading-text">Đăng Nhập</h3>
            </div>
            <div className="option-content">
              <p>
                Khai Tâm khuyến khích đăng ký thành viên để được tích lũy Sen
                búp, và mua hàng nhanh hơn cho những lần sau
              </p>
            </div>
          </div>
          <div className="spacing-for-options">
            <div className="spacing-line"></div>
            <div className="spacing-label">
              <p>hoặc</p>
            </div>
            <div className="spacing-line"></div>
          </div>
          <div className="option-as-guese option">
            <div className="option-heading">
              <h3 className="heading-text">Tiếp Tục</h3>
            </div>
            <div className="option-content">
              <Link href="/thanh-toan/dia-chi">
                <a className="link-as-btn">Tiếp Tục</a>
              </Link>
            </div>
          </div>
        </div>
      </StyledPage>
    </>
  );
};

export default CheckoutStep1Page;
