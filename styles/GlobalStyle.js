import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body,p,button,a  {
    font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  }
  
   /* System Design */
  html,
  body {
    font-size: 16px;
    overflow-x: hidden;
    font-family:${({ theme }) => theme.fonts.sans};
    /* Colors */
    background-color: ${({ theme }) => theme.colors.gray["900"]};
    color: ${({ theme }) => theme.colors.gray["100"]};
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
    font-size: 3.052em;
    font-weight: normal;
  }
  h2 {
    font-size: 2.441em;
    font-weight: normal;
  }
  h3 {
    font-size: 1.953em;
    font-weight: normal;
  }
  h4 {
    font-size: 1.563em;
    font-weight: normal;
  }
  h5,
  h6 {
    font-size: 1.25em;
    font-weight: normal;
  }
  small {
    font-size: 0.8em;
  }

  strong {
    font-weight: bold;
  }


`;

export default GlobalStyle;
