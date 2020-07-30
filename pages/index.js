import React, { useRef, useEffect } from "react";
// Import custom components
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import FeaturedSection from "../components/Homepage/FeaturedSection";
import FeaturedBooks from "../components/Homepage/FeaturedSection/FeaturedBooks";
import OfficeSupplements from "../components/Homepage/OfficeSupplements";
import CustomerReviews from "../components/Homepage/CustomerReviews";
import Head from "next/head";

import client from "../database/sanity";
import { ref } from "yup";

export default function Home({ banners, featured }) {
  const fbRef = useRef(null);

  useEffect(() => {
    fbRef.current = (
      <Head>
        <script>
          {
            (window.fbAsyncInit = function () {
              FB.init({
                appId: "your-app-id",
                autoLogAppEvents: true,
                xfbml: true,
                version: "v7.0",
              });
            })
          }
        </script>
        <script
          async
          defer
          crossorigin="anonymous"
          src="https://connect.facebook.net/en_US/sdk.js"
        ></script>
      </Head>
    );
  }, []);
  return (
    <>
      {ref.current}
      <Header />
      <div className="spacer" style={{ width: "100%", height: "2rem" }}></div>
      <FeaturedSection banners={banners} />
      <div style={{ height: "10rem" }}></div>
      <FeaturedBooks items={featured} />
      <div style={{ height: "10rem" }}></div>
      <OfficeSupplements />
      <div style={{ height: "10rem" }}></div>
      {/* <CustomerReviews /> */}
      <Footer />
    </>
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

  return {
    props: {
      banners: await fetchBanners(),
      featured: await fetchFeatured(),
    },
  };
}
