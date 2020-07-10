import React from "react";
import NextApp from "next/app";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import "destyle.css";
import GlobalStyle from "../styles/GlobalStyle";
import defaulttheme from "../styles/defaulttheme";
import Header from "../components/Navigation/Header";

//
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={defaulttheme}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&family=Spectral+SC&display=swap"
            rel="stylesheet"
          />
          <script src="https://use.fontawesome.com/23bfb3476e.js"></script>
        </Head>
        <GlobalStyle />
        <Header />
        <div className="spacer" style={{ width: "100%", height: "2rem" }}></div>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}
