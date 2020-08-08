import React from "react";
import SigningLayout from "../components/Layout/SigningLayout";
import { SignInForm } from "../components/forms/SignInLogInForms";
import Link from "next/link";

const SignInPage = () => {
  return (
    <SigningLayout>
      <div className="header">
        <h1 className="big-title">Đăng Nhập</h1>
        <p>Chào mừng bạn quay trở lại</p>
      </div>
      <SignInForm />
      <p style={{ marginTop: "2rem" }}>
        Chưa có tài khoản? Bạn có thể tạo tài khoản{" "}
        <Link href="/dang-ky">
          <a>tại đây.</a>
        </Link>
      </p>
    </SigningLayout>
  );
};

export default SignInPage;
