import React from "react";
import styled from "styled-components";
// Import custom components
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import FeaturedSection from "../components/Homepage/FeaturedSection";
import FeaturedBooks from "../components/Homepage/FeaturedSection/FeaturedBooks";
import OfficeSupplements from "../components/Homepage/OfficeSupplements";
import CustomerReviews from "../components/Homepage/CustomerReviews";
import Head from "next/head";
import HomepageBooksGrid from "../components/grids/HomepageBooksGrid";

import client from "../database/sanity";

const StyledPage = styled.div`
  ${({ theme }) => theme.backgrounds.bambooTexture};

  .elevated {
    /* ${({ theme }) => theme.maxWidths.maximum}; */
    background-color: ${({ theme }) => theme.colors.neutral["700"]};
    padding: ${({ theme: { spacing } }) => `${spacing["16"]} ${spacing["8"]}`};
  }

  ${({ theme }) => theme.breakpoints.sm} {
    .elevated {
      padding: ${({ theme }) => `${theme.spacing["8"]} ${theme.spacing["2"]}`};
    }
  }
`;

export default function Home({
  banners,
  featured,
  editorChoice,
  newlySelectedBooks,
  bestSellerBooks,
}) {
  return (
    <StyledPage>
      <Header />
      <div className="spacer" style={{ width: "100%", height: "2rem" }}></div>
      <FeaturedSection banners={banners} />
      <div className="spacer" style={{ width: "100%", height: "2rem" }}></div>
      <div className="elevated">
        <HomepageBooksGrid books={editorChoice} title="Sách Tinh Tuyển" />

        <div style={{ height: "5rem" }}></div>
        <FeaturedBooks items={featured} />
      </div>
      <div style={{ height: "5rem" }}></div>
      <div className="elevated">
        <HomepageBooksGrid
          books={newlySelectedBooks}
          title="Sách Mới Chọn Lọc"
        />
        <div style={{ height: "3rem" }}></div>
        <HomepageBooksGrid books={bestSellerBooks} title="Sách Bán Chạy" />
      </div>
      <div style={{ height: "5rem" }}></div>
      <OfficeSupplements />
      <div style={{ height: "10rem" }}></div>
      {/* <CustomerReviews /> */}
      <Footer />
    </StyledPage>
  );
}

export async function getStaticProps(context) {
  async function fetchBanners() {
    let bannerData = await client.fetch(
      `*[_type == "banner" && show == true] | order(_createdAt desc)`
    );
    let transformed = bannerData.map((b) => ({
      image: b.image,
      label: b.label,
      slug: b.slug.current,
    }));
    return transformed;
  }

  async function fetchFeatured() {
    let data = await client.fetch(
      `*[_type == "featuredBook" && show == true] | order(_createdAt desc)`
    );
    let transformed = data.map((b) => ({
      image: b.image,
      title: b.title,
      slug: b.slug.current,
      description: b.description,
    }));
    return transformed;
  }

  function fetchBooksInGroup(slug) {
    async function fetchEditorChoiceBooks(slug) {
      let data = await client.fetch(
        `*[_type == "promotingBook" && group == $slug && show == true]`,
        { slug }
      );
      let transformed = data.map((b) => ({
        image: b.image,
        title: b.title,
        author: b.author,
        slug: b.slug.current,
      }));
      return transformed;
    }
    return fetchEditorChoiceBooks(slug);
  }

  return {
    props: {
      banners: await fetchBanners(),
      featured: await fetchFeatured(),
      editorChoice: await fetchBooksInGroup("sach-tinh-tuyen"),
      newlySelectedBooks: await fetchBooksInGroup("sach-moi-tuyen-chon"),
      bestSellerBooks: await fetchBooksInGroup("sach-duoc-mua-nhieu-nhat"),
    },
  };
}
