import React from "react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <a>
        <img
          src={require("../../public/brand-images/logo.png")}
          alt="Logotype Khai Tam"
          width="200px"
        />
      </a>
    </Link>
  );
};

export default Logo;
