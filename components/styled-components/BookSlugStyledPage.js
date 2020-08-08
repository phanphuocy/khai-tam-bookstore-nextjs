import React from "react";
import styled from "styled-components";

const StyledPage = styled.main`
  /* ${({ theme }) => theme.backgrounds.woodTexture}; */
  background-color: ${({ theme }) => theme.colors.neutral["800"]};

  .container {
    /* ${({ theme }) => theme.maxWidths.desktop}; */
    ${({ theme }) => theme.borderRadius.base}
    ${({ theme }) => theme.borderRadius["rounded"]}
    /* border: ${({ theme }) => theme.borders.base}; */
    /* padding: ${({ theme }) =>
      `${theme.spacing["12"]} ${theme.spacing["24"]}`}; */



    section.top-navigation {
      background-color:${({ theme }) => theme.colors.neutral["700"]};

      nav.top-navigation__container {
        ${({ theme }) => theme.maxWidths.desktop};
        padding:${({ theme: { spacing } }) => `${spacing[8]} 0`};
        .slash {
          color:${({ theme }) => theme.colors.gray["600"]};
        }
        a  {
          padding:${({ theme: { spacing } }) =>
            `${spacing["2"]} ${spacing["2"]}`};
            margin:${({ theme: { spacing } }) =>
              `${spacing["2"]} ${spacing["1"]}`};
          color:${({ theme }) => theme.colors.gray["400"]};

          &:hover, &:active {
            ${({ theme: { borderRadius } }) => borderRadius["rounded"]};
            background-color: ${({ theme: { colors } }) => colors.gray["800"]};
            color:${({ theme }) => theme.colors.gray["300"]};
            text-decoration:none;
          }
        }
      }
    }
    
    section.book-info {
      ${({ theme }) => theme.maxWidths.desktop};
       padding: ${({ theme }) =>
         `${theme.spacing["24"]} ${theme.spacing["24"]}`};
      display: grid;
      grid-template-columns: 5fr 6fr;
      grid-template-rows: repeat(3, auto);
      grid-template-areas:
        "cover info"
        "action info"
        ". info";

      .cover-container {
        grid-area: cover;
        display: flex;
        justify-content: center;
        height: 28rem;

        img {
          ${({ theme }) => theme.shadow["lg"]};
          /* max-width: 15rem; */
        }
      }
      .infomation-container {
        grid-area: info;

        h1.title {
          font-size: ${({ theme }) => theme.fontSizes["xl"]};
          font-family: ${({ theme }) => theme.fonts.title};
          color:${({ theme }) => theme.colors.gray["200"]};
          /* letter-spacing: 1px; */
          font-weight: 500;
          line-height: 125%;
          margin: ${({ theme }) => `${theme.spacing["2"]} 0`};
        }

        .spacer-below-title {
          height: 2px;
          width: 30%;
          background-color: rgba(0,0,0,0.05);
        }

        .links-container {
          ul {
            padding:${({ theme: { spacing } }) => `${spacing["2"]} 0`};
            display: flex;
            flex-wrap: wrap;

            li {
              flex-basis: 50%;
              padding: ${({ theme }) =>
                `${theme.spacing["2"]} ${theme.spacing["6"]} ${theme.spacing["2"]} 0`};
             

              .label {
                color: ${({ theme }) => theme.colors.gray["300"]};
                margin-right: ${({ theme }) => theme.spacing["2"]};
              }
            }
          }
        }
        .addiInfos-container {
          li {
            flex-basis: 50%;
            padding: ${({ theme }) => `${theme.spacing["2"]} 0`};

            .label {
              color: ${({ theme }) => theme.colors.gray["300"]};
              margin-right: ${({ theme }) => theme.spacing["2"]};
            }
          }
        }

        .addiServices-container {
          padding: ${({ theme }) => `${theme.spacing["3"]} 0`};

          h6.addiServices-container__label {
            margin-bottom:${({ theme: { spacing } }) => spacing["2"]};
          }

          .addiServices-container__items {
            border: 1px solid green;
            ${({ theme }) => theme.borderRadius["rounded-lg"]};
            background-color: ${({ theme: { colors } }) => colors.green["900"]};
            padding:${({ theme }) =>
              `${theme.spacing["4"]} ${theme.spacing["6"]}`};
          }

          p,
          h6 {
            line-height: 200%;
            svg {
              margin-right: ${({ theme }) => theme.spacing["4"]};
              color: ${({ theme }) => theme.colors.green["500"]};
            }
          }
        }
      }
      .action-container {
        grid-area: action;
        padding:${({ theme }) =>
          `${theme.spacing["4"]} ${theme.spacing["16"]}`};
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;

        .add-to-cart-btn {
          ${({ theme }) => theme.borderRadius["rounded-full"]};
          background-color:${({ theme }) => theme.colors.green["500"]};
          padding:${({ theme }) => theme.spacing["4"]};
          color: white;
        }
        .add-to-cart-btn:hover,
        .add-to-cart-btn:active {
          background-color:${({ theme }) => theme.colors.green["400"]};
        }
      }
    }

    section.book-introduction {
      /* ${({ theme }) => theme.maxWidths.desktop}; */
      /* ${({ theme }) => theme.backgrounds.bambooTexture} */
      background-color:${({ theme }) => theme.colors.neutral["500"]};

      padding: ${({ theme }) =>
        `${theme.spacing["8"]} 0 ${theme.spacing["40"]}`};
      display: flex;
      flex-direction: column;
      align-items: center;
      /* max-width: 50rem; */
      width: 100%;
      margin: 0 auto;
      border-top: ${({ theme }) => theme.borders.base};

      h2 {
        padding: ${({ theme }) => `${theme.spacing["8"]} 0`};
        font-family: ${({ theme }) => theme.fonts.serif};
      }

      article.book-introduction__content {
        ${({ theme }) => theme.borderRadius["rounded"]};
        ${({ theme }) => theme.maxWidths.tablet};

        /* background-color: #fcfce3; */
        background-color: ${({ theme }) =>
          theme.colors.neutral["behrSnowTint4"]};
        /* color: #5c5c0a; */
        color: #4a4a48;
        /* padding: ${({ theme }) =>
          `${theme.spacing["12"]} ${theme.spacing["24"]}`}; */
      }

      p {
        line-height: 150%;
        margin-bottom: ${({ theme }) => theme.spacing["3"]};
      }

      p:first-of-type:first-letter {
        /* color: ${({ theme }) => theme.colors.green["300"]}; */
        float: left;
        font-family: Georgia;
        font-size: 75px;
        line-height: 60px;
        padding-top: 4px;
        padding-right: 8px;
        padding-left: 3px;
      }
      p:first-of-type {
        text-indent: -1px;
      }
    }
  }

  .similar-books-container {
    ${({ theme }) => theme.maxWidths.desktop};
    ul {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-column-gap:${({ theme }) => theme.spacing["3"]};
      grid-template-rows: repeat(auto, auto);
      grid-row-gap:${({ theme }) => theme.spacing["4"]};

      padding:${({ theme }) => `${theme.spacing["8"]} 0`};

      li.si-book {
        ${({ theme: { borderRadius } }) => borderRadius["rounded"]};
        display: flex;
        flex-direction: column;
        /* border-right: ${({ theme }) => theme.borders.base}; */
        margin-right: ${({ theme }) => theme.spacing["1"]};
        padding-right: ${({ theme }) => theme.spacing["1"]};         
        /* padding: ${({ theme: { spacing } }) =>
          `${spacing["4"]} ${spacing["4"]}`}; */
        background-color:${({ theme }) => theme.colors.neutral["800"]};
        

        .si-book-cover {
          max-width: 45%;
          margin-right: 5%;


          img {
            ${({ theme }) => theme.shadow.base};
            height: 10rem;
            width: 100%;
            object-fit: contain;
          }

        }
        .si-book-info {
          padding:${({ theme }) => `${theme.spacing["2"]} 0`};
          flex: 50% 0 1;
          font-size: ${({ theme }) => theme.fontSizes.sm};

          .si-book-category {
            /* padding:${({ theme }) =>
              `${theme.spacing["1"]} ${theme.spacing["3"]}`};
            ${({ theme }) => theme.borderRadius["rounded-full"]};
            border: ${({ theme }) =>
              `2px solid ${theme.colors.green["500"]}`}; */
            color:${({ theme }) => theme.colors.green["500"]};
            display: inline-block;
            margin-bottom:${({ theme }) => theme.spacing["2"]};
          }

          .si-book-title {
            font-weight: 600;
            font-family:${({ theme }) => theme.fonts.serif};
          }

          .si-book-author {
            color:${({ theme }) => theme.colors.gray["300"]};
          }
        }
      }
    }
  }

  .customers-reviews {
    background-color: ${({ theme }) => theme.colors.neutral["700"]};
    padding:${({ theme }) => `${theme.spacing["4"]} 0`};
    .container {
      ${({ theme }) => theme.maxWidths.desktop}
    }
  }

  section.navigation {
    background-color: white;
    ${({ theme }) => theme.shadow.base};

    nav {
      display: flex;
      justify-content: space-around;
      border: ${({ theme }) => `1px dashed ${theme.colors.border.default}`};
      ${({ theme }) => theme.maxWidths.laptop};
      a {
        padding:${({ theme }) => `${theme.spacing["2"]} ${theme.spacing["3"]}`};
      }
    }
  }
`;

export default StyledPage;
