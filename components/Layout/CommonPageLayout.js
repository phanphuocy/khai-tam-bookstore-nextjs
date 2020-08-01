import React from "react";
import styled from "styled-components";
import Header from "../Navigation/Header";
import Footer from "../Navigation/Footer";

const StyledLayout = styled.div`
  background-color: white;

  .container {
    ${({ theme }) => theme.maxWidths.desktop};
    padding: ${({ theme: { spacing } }) => `${spacing["8"]} ${spacing["4"]}`};
    padding-left: ${({ theme }) => theme.spacing["24"]};
    display: flex;
    flex-direction: row-reverse;

    .container__side {
      flex-basis: 25%;
      margin-left: ${({ theme }) => theme.spacing["16"]};
      padding-left: ${({ theme }) => theme.spacing["4"]};
      border-left: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
      padding-top: ${({ theme }) => theme.spacing["8"]};

      li {
        margin-bottom: ${({ theme }) => theme.spacing["3"]};

        a {
          color: ${({ theme }) => theme.colors.gray["300"]};
        }
      }
    }

    .container__main {
      flex-basis: 75%;

      blockquote {
        font-family: ${({ theme }) => theme.fonts.title};
        font-size: ${({ theme }) => theme.fontSizes.md};
        font-style: normal;
        padding: ${({ theme }) =>
          `${theme.spacing["6"]} ${theme.spacing["8"]} ${theme.spacing["12"]}`};
        line-height: 1.3;
        opacity: 0.8;
      }

      blockquote::before,
      blockquote::after {
        content: "“";
        font-family: Georgia;
        font-size: 8rem;
        margin: -2rem 0 0 -4rem;
        position: absolute;
        opacity: 0.5;
      }

      blockquote::after {
        content: "”";
        margin: -1.4rem -4rem 0 0;
      }

      li:before {
        content: "◼️";
        margin-right: ${({ theme }) => theme.spacing["1"]};
      }
      p,
      li {
        margin-bottom: ${({ theme }) => theme.spacing["2"]};
      }

      h1,
      h2,
      h3,
      h4 {
        margin: ${({ theme: { spacing } }) =>
          `${spacing["6"]} 0 ${spacing["2"]}`};
        color: ${({ theme }) => theme.colors.gray["200"]};
        /* font-family: ${({ theme }) => theme.fonts.serif}; */
      }

      strong {
        color:${({ theme }) => theme.colors.gray["300"]};
      }

      table {
        width: 100%;
        max-width: 80%;
        margin: 2rem auto;
      }

      table,
      tr,
      td {
        border: ${({ theme }) => `1px solid ${theme.colors.gray["500"]}`};
      }
      td {
        padding: ${({ theme: { spacing } }) =>
          `${spacing["2"]} ${spacing["3"]}`};
      }
    }
  }
`;

const CommonPageLayout = ({ children, toc }) => {
  return (
    <>
      <Header />
      <StyledLayout>
        <div className="container">
          <nav className="container__side">
            <ul>
              {toc.map((item, index) => (
                <li style={{ marginLeft: item.indent * 4 }} key={index}>
                  <a id={item.key} key={item.key} href={`#${item.key}`}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <main className="container__main">{children}</main>
        </div>
      </StyledLayout>
      <Footer />
    </>
  );
};

export default CommonPageLayout;
