import Head from "next/head";

// Import custom components
import Header from "../components/Navigation/Header";
import FeaturedSection from "../components/Homepage/FeaturedSection";
import CartModal from "../components/Modals/CartModal";

export default function Home() {
  return (
    <>
      <Header />
      <div className="spacer" style={{ width: "100%", height: "2rem" }}></div>
      <FeaturedSection />
      <CartModal />
    </>
  );
}
