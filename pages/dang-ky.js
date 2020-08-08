import React from "react";
import { SignUpForm } from "../components/forms/SignInLogInForms";
import SigningLayout from "../components/Layout/SigningLayout";
import Link from "next/link";

const SignInPage = () => {
  return (
    <SigningLayout
      bgId="michael-hull-UdvXJ95Yqt8-unsplash_amsgjq"
      bgCredit="michael-hull"
    >
      <div className="header">
        <h1 className="big-title">Đăng Ký</h1>
      </div>
      <SignUpForm />
      <p style={{ marginTop: "2rem" }}>
        Đã có tài khoản? Vui lòng{" "}
        <Link href="/dang-nhap">
          <a>đăng nhập tại đây.</a>
        </Link>
      </p>
    </SigningLayout>
  );
};

export default SignInPage;
