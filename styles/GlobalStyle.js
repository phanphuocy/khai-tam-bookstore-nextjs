import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Proxima Nova";
    src: local("Proxima Nova"), url("/fonts/regular.otf") format("opentype");
    };
  @font-face {
  font-family: "Proxima Nova";
  src: local("Proxima Nova"), url("/fonts/bold.otf") format("opentype");
  font-weight: bold;
  };

  html, body,p,button, a  {
    font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
  }

  /* Smaller text on mobile devices */
  ${({ theme }) => theme.breakpoints.sm} {
    html, body, p ,button, a {
      font-size: 15px;
    }
  }
  
   /* System Design */
  html,
  body {
    /* scroll-behavior: smooth; */
    font-size: 16px;
    overflow-x: hidden;
    font-family:${({ theme }) => theme.fonts.sans};
    /* Colors */
    background-color: ${({ theme }) => theme.colors.gray["900"]};
    color: ${({ theme }) => theme.colors.gray["100"]};
  }

  body {
    overflow-y: hidden;
  }

  p {
    line-height: 1.4; 
    font-family:${({ theme }) => theme.fonts.sans};
  }

  button {
    font-size: ${({ theme }) => theme.fontSizes.base};
  }

  /* Customized Links */
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.gray["200"]};
  }
  a:hover,
  a:active {
    text-decoration: underline;
    cursor: pointer;
  }

  /* Media Queries */



  /* Type Scale */
  h1 {
    font-size: ${({ theme }) => theme.fontSizes["3xl"]};
    font-weight: normal;
  }
  h2 {
    font-size: ${({ theme }) => theme.fontSizes["2xl"]};
    font-weight: normal;
  }
  h3 {
    font-size: ${({ theme }) => theme.fontSizes["xl"]};
    font-weight: normal;
  }
  h4 {
    font-size: ${({ theme }) => theme.fontSizes["lg"]};
    font-weight: normal;
  }
  h5  {
    font-size: ${({ theme }) => theme.fontSizes["md"]};
    font-weight: bold;
  }

  h6 {
    font-size: ${({ theme }) => theme.fontSizes["base"]};
    color: ${({ theme }) => theme.colors.gray["100"]}; 
    font-weight: bold;
  }
  small {
    font-size: ${({ theme }) => theme.fontSizes["sm"]};
  }

  strong {
    font-weight: bold;
  }
`;

export default GlobalStyle;
