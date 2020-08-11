import React from "react";
import styled from "styled-components";

const StyledPage = styled.main`
  /* ${({ theme }) => theme.backgrounds.woodTexture}; */
  background-color: ${({ theme }) => theme.colors.neutral["800"]};

  .group {
    /* border: 1px solid green; */
  }

  .navigation-group {
    background-color:${({ theme }) => theme.colors.neutral["700"]};
    .navigation-group__singleton {
      ${({ theme }) => theme.maxWidths.desktop};
    }
  }

  nav.categories-links  {
    padding:${({ theme: { spacing } }) => `${spacing[8]} 0`};
    
    .slash {
      color:${({ theme }) => theme.colors.neutral["400"]};
    }
    a  {
      padding:${({ theme: { spacing } }) => `${spacing["2"]} ${spacing["3"]}`};
        margin:${({ theme: { spacing } }) => `${spacing["2"]} ${spacing["1"]}`};
      color:${({ theme }) => theme.colors.neutral["200"]};

      &:hover, &:active {
        ${({ theme: { borderRadius } }) => borderRadius["rounded"]};
        background-color: ${({ theme: { colors } }) => colors.neutral["450"]};
        color:${({ theme }) => theme.colors.neutral["100"]};
        text-decoration:none;
      }
    }
  }
    
    div.information-group {
      div.information-group__wrapper {
      ${({ theme }) => theme.maxWidths.desktop};
       padding: ${({ theme }) =>
         `${theme.spacing["24"]} ${theme.spacing["24"]}`};
      display: grid;
      grid-template-columns: 4fr 6fr 2fr;
      grid-template-rows: repeat(3, auto);
      grid-template-areas:
        "cover title title"
        "cover publishInfo physicalInfo"
        "cover pricing physicalInfo"
        "cover actions ."
        "cover offerings .";
      grid-column-gap: ${({ theme }) => theme.spacing["2"]};

      ${({ theme }) => theme.breakpoints.sm} {
        padding:${({ theme }) => `${theme.spacing["2"]} ${theme.spacing["4"]}`};
        grid-template-columns: 1fr;
        grid-template-rows: auto auto auto auto;
        grid-template-areas: 
          "cover"
          "title"
          "publishInfo"
          "physicalInfo"
          "pricing"
          "actions"          
          "offerings";
      }

      .information-group__item {
        border: 1px solid orange; 
      }
      .title {
        grid-area: title;
        h1.title__book-title {
          font-size: ${({ theme }) => theme.fontSizes["xl"]};
          font-family: ${({ theme }) => theme.fonts.title};
          color:${({ theme }) => theme.colors.gray["200"]};
          /* letter-spacing: 1px; */
          font-weight: 500;
          line-height: 125%;
          margin: ${({ theme }) => `${theme.spacing["2"]} 0`};
        }
      }
      .cover {
        grid-area: cover;
        display: flex;
        justify-content: center;
        height: 28rem;

        img {
          ${({ theme }) => theme.shadow["lg"]};
          /* max-width: 15rem; */
        }

        ${({ theme }) => theme.breakpoints.sm} {
          max-height: 20rem;
          img {
            height: 100%;
            width: 100%;
            object-fit: contain;
          }
        }
      }

      .publish-info {
        grid-area: publishInfo;

        .spacer-below-title {
          height: 2px;
          width: 30%;
          background-color: rgba(0,0,0,0.05);
        }

 
        ul {
          padding:${({ theme: { spacing } }) => `${spacing["2"]} 0`};
          display: flex;
          flex-direction: column;

          li {
      
            padding: ${({ theme }) =>
              `${theme.spacing["2"]} ${theme.spacing["6"]} ${theme.spacing["1"]} 0`};
            

            .label {
              color: ${({ theme }) => theme.colors.gray["300"]};
              margin-right: ${({ theme }) => theme.spacing["2"]};
            }
          }
        
        }
        
      }

      .offerings {
        grid-area: offerings;
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

      .physical-info {
        grid-area: physicalInfo;

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
      }

      .pricing {
        grid-area: pricing;
        padding:${({ theme }) => `${theme.spacing["4"]} 0 0`};

        p {
          margin-bottom:${({ theme }) => theme.spacing["1"]};
        }

        .pricing__label {
          color:${({ theme }) => theme.colors.gray["300"]};
        }
        .pricing__value {
          font-weight: 600;
        }
        .pricing__discounted {
          color:${({ theme }) => theme.colors.green["300"]};
          font-weight: 200;
          font-size: ${({ theme }) => theme.fontSizes["2xl"]};
          margin-right:${({ theme }) => theme.spacing["2"]};
        }
      }

      .actions {
        grid-area: actions;
        display: grid;
        grid-template-columns: 5fr 3fr;
        grid-column-gap:${({ theme }) => theme.spacing["1"]};
        padding:${({ theme }) => `${theme.spacing["4"]} 0`};
        /* display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: stretch; */

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

    
  }

  div.details-navigation {
    background-color: ${({ theme }) => theme.colors.neutral["700"]};
    ${({ theme }) => theme.shadow.base};

    nav.details-navigation__singleton {  
        display: flex;
        justify-content: flex-start;
        border: ${({ theme }) => `1px dashed ${theme.colors.border.default}`};
        ${({ theme }) => theme.maxWidths.desktop};

        a {
          padding:${({ theme }) =>
            `${theme.spacing["3"]} ${theme.spacing["6"]}`};
        }
      }
    }

    ${({ theme }) => theme.breakpoints.sm} {
      nav.details-navigation__singleton {
        a {
          padding: ${({ theme }) =>
            `${theme.spacing["3"]} ${theme.spacing["1"]}`};
        }
      } 
    }
  }

  div.details-group {
    background-color: ${({ theme }) => theme.colors.neutral["700"]};
    div.details-group__wrapper {
      ${({ theme }) => theme.maxWidths.desktop};
      padding:${({ theme }) => `${theme.spacing["8"]} 0`};
      display: grid;
      grid-template-columns: 3fr 2fr;
      grid-template-rows: auto auto;
      grid-template-areas: 
        "introduction reviews"
        "toc reviews";
      grid-column-gap: ${({ theme }) => theme.spacing["24"]};
      grid-row-gap: ${({ theme }) => theme.spacing["16"]};

      ${({ theme }) => theme.breakpoints.sm} {
        padding:${({ theme }) => `0 ${theme.spacing["4"]}`};
        grid-template-columns: 1fr;
        grid-template-rows: auto auto auto;
        grid-template-areas: 
          "introduction"
          "toc"
          "reviews";
        grid-row-gap: ${({ theme }) => theme.spacing["4"]};

        .customers-reviews {
          padding-left: 0;
        }
      }
    }

    

    div.details-group__introduction {
      grid-area: introduction;
    }
    div.details-group__toc {
      grid-area: toc;
    }
    div.details-group__reviews {
      grid-area: reviews;
    }
  }

  .introduction {
      display: flex;
      flex-direction: column;
      align-items: center;

      article.book-introduction__content {
        ${({ theme }) => theme.borderRadius["rounded"]};
        ${({ theme }) => theme.maxWidths.tablet};
        color: ${({ theme }) => theme.colors.neutral["200"]};

        p {
          line-height: 150%;
          margin-bottom: ${({ theme }) => theme.spacing["3"]};
        }
        p:first-of-type:first-letter {
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

    ${({ theme }) => theme.breakpoints.sm} {
      padding:${({ theme }) => `${theme.spacing["1"]} ${theme.spacing["4"]}`};

      .heading {
        margin-bottom: ${({ theme }) => theme.spacing["2"]};
      }
    }
    
    ul {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      /* grid-column-gap:${({ theme }) => theme.spacing["3"]}; */
      grid-template-rows: repeat(auto, auto);
      /* grid-row-gap:${({ theme }) => theme.spacing["4"]}; */

      padding:${({ theme }) => `${theme.spacing["8"]} 0`};

      ${({ theme }) => theme.breakpoints.sm} {
        grid-template-columns: repeat(2,1fr);

        li.si-book {
          .si-book-cover {
            max-width: 120px;
            justify-content: center;

            img {
              max-width: 120px;
            }
          }
        }
      }

      li.si-book {
        /* ${({ theme: { borderRadius } }) => borderRadius["rounded"]}; */
        display: flex;
        flex-direction: column;
        padding:${({ theme }) => `${theme.spacing["2"]} ${theme.spacing["4"]}`};
        /* border-right: ${({ theme }) => theme.borders.base}; */
        /* margin-right: ${({ theme }) => theme.spacing["1"]};
        padding-right: ${({ theme }) => theme.spacing["1"]};          */
        /* padding: ${({ theme: { spacing } }) =>
          `${spacing["4"]} ${spacing["4"]}`}; */
        background-color:${({ theme }) => theme.colors.neutral["800"]};
        border: 1px solid rgba(0,0,0,0.04);

        .si-book-cover {
          display: flex;
          justify-content: center;


          img {
            ${({ theme }) => theme.shadow.lg};
            height: 10rem;
            width: auto;
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
    padding-left:${({ theme }) => theme.spacing["8"]};
    .container {
      ${({ theme }) => theme.maxWidths.desktop}
    }
  }

  div.heading {
    padding:${({ theme }) => `${theme.spacing["4"]} 0`};
    border-bottom:${({ theme }) => `1px dashed ${theme.colors.neutral["450"]}`};
    margin-bottom:${({ theme }) => theme.spacing["4"]};
    .heading-text {
      font-family: ${({ theme }) => theme.fonts.title};
      font-weight: 400;      
      color:${({ theme }) => theme.colors.neutral["250"]};
    }
  }

  .two-line-clamp {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;  
    overflow: hidden;
  }
`;

export default StyledPage;
