// Import custom components
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import FeaturedSection from "../components/Homepage/FeaturedSection";
import CartModal from "../components/Modals/CartModal";

import client from "../database/sanity";

export default function Home({ banners }) {
  return (
    <>
      <Header />
      <div className="spacer" style={{ width: "100%", height: "2rem" }}></div>
      <FeaturedSection banners={banners} />
      <CartModal />
      <div style={{ height: "10rem" }}></div>
      <Footer />
    </>
  );
}

export async function getStaticProps(context) {
  let data = await client.fetch(
    `*[_type == "banner" && show == true] | order(_createdAt desc)`
  );

  let banners = data.map((b) => ({
    image: b.image,
    label: b.label,
    slug: b.slug.current,
  }));

  return {
    props: {
      banners,
    },
  };
}
