import React from "react";
import styled from "styled-components";
import Header from "../Navigation/Header";
import Footer from "../Navigation/Footer";

const StyledLayout = styled.div`
  background-color: white;

  .container {
    ${({ theme }) => theme.maxWidths.desktop};
    padding: ${({ theme: { spacing } }) => `${spacing["8"]} ${spacing["4"]}`};
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
        font-family: ${({ theme }) => theme.fonts.serif};
        font-size: ${({ theme }) => theme.fontSizes.md};
        font-style: italic;
        padding: ${({ theme }) =>
          `${theme.spacing["4"]} ${theme.spacing["6"]}`};
        line-height: 1.3;
      }

      h1,
      h2,
      h3,
      h4 {
        margin: ${({ theme: { spacing } }) => `${spacing["4"]} 0`};
        color: ${({ theme }) => theme.colors.gray["200"]};
        font-family: ${({ theme }) => theme.fonts.serif};
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
              {toc.map((item) => (
                <li style={{ marginLeft: item.indent * 4 }}>
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
