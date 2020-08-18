import React from "react";
import NextApp from "next/app";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import "destyle.css";
import "react-dropdown/style.css";

import GlobalStyle from "../styles/GlobalStyle";
import defaulttheme from "../styles/defaulttheme";
import presets from "../styles/presets";

// Import SEO
import { DefaultSeo } from "next-seo";

// Import icons
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

// Import contexts
import UserContextProvider from "../contexts/userContext";
import CartContextProvider from "../contexts/cartContext";

import sizeMe from "react-sizeme";
sizeMe.noPlaceholders = true;

config.autoAddCss = false;

const defaultSEOTags = {
  title: "Sách Tuyển Chọn Đích Thực",
  titleTemplate: "%s | Sách Khai Tâm",
  canonical: process.env.HOSTNAME,
  description:
    "Tuyển chọn nhiều sách hay về Lịch sử Việt Nam và thế giới của nhiều tác giả nổi tiếng. Đặt sách trực tuyến dễ dàng, được tặng kèm Bookmark và bao sách miễn",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://khai-tam-bookstore.vercel.app/",
    site_name: "Sách Khai Tâm | Sách Tuyển Chọn Đích Thực",
  },
};

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={{ ...defaulttheme, ...presets }}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&family=Maitree&family=Literata&display=swap"
            rel="stylesheet"
          />
          <script src="https://use.fontawesome.com/23bfb3476e.js"></script>
        </Head>
        <DefaultSeo {...defaultSEOTags} />
        <GlobalStyle />
        <UserContextProvider>
          <CartContextProvider>
            <Component {...pageProps} />
          </CartContextProvider>
        </UserContextProvider>
      </ThemeProvider>
    );
  }
}
