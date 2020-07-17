import React from "react";
import styled from "styled-components";
import { Formik } from "formik";
import axios from "axios";

const StyledPage = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 50rem;
  grid-template-rows: 1fr;

  .with-background {
    background-image: url("images/hisu-lee-SrkuyPb3aUk-unsplash.jpg");
    background-position: center;
    background-size: cover;

    padding: ${({ theme }) => `${theme.spacing["8"]} ${theme.spacing["16"]}`};

    .credit-image {
      color: white;
    }
  }

  .container {
    ${({ theme }) => theme.shadow.base};
    ${({ theme }) => theme.borderRadius["rounded"]};
    background-color: white;
    max-width: 50rem;
    width: 100%;
    margin: 0 auto;
    min-height: 4rem;
    padding: ${({ theme }) =>
      `${theme.spacing["12"]} ${theme.spacing["48"]} ${theme.spacing["8"]} ${theme.spacing["8"]}`};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .header {
      padding: ${({ theme }) => `0 0 ${theme.spacing["4"]}`};

      .big-title {
        font-family: ${({ theme }) => theme.fonts.serif};
        margin-bottom: ${({ theme }) => theme.spacing["2"]};
      }
    }

    form {
      display: inline-block;

      label {
        padding: ${({ theme }) =>
          `${theme.spacing["3"]} ${theme.spacing["2"]}`};
      }

      .error-display {
        height: 1rem;
        padding: ${({ theme }) =>
          `${theme.spacing["3"]} ${theme.spacing["2"]}`};
        color: orangered;
      }

      .field-input {
        display: flex;
        flex-direction: column;
        margin-bottom: ${({ theme }) => theme.spacing["2"]};

        input {
          width: 30rem;
          border-radius: 1rem;
          border: ${({ theme }) => `1px solid ${theme.colors.gray["900"]}`};
          background-color: ${({ theme }) => theme.colors.gray["900"]};
          box-shadow: inset 3px 4px 8px rgba(122, 122, 122, 0.04),
            inset -3px -4px 8px rgba(122, 122, 122, 0.04);
          padding: ${({ theme }) =>
            `${theme.spacing["3"]} ${theme.spacing["6"]}`};
        }
      }

      .submit-btn {
        background-color: ${({ theme }) => theme.colors.green["500"]};
        border-radius: 1rem;
        color: white;
        font-weight: 600;
        width: 100%;
        padding: ${({ theme }) =>
          `${theme.spacing["3"]} ${theme.spacing["6"]}`};
        display: flex;
        justify-content: center;
      }
    }
  }
`;

const SignInPage = () => {
  return (
    <StyledPage>
      <div className="with-background">
        <div className="credit-image">
          <p>
            <small>Credit Ảnh: @lee_hisu</small>
          </p>
        </div>
      </div>
      <div className="container">
        <div className="header">
          <h1 className="big-title">Đăng Nhập</h1>
          <p>Chào mừng bạn quay trở lại</p>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={async (values, children) => {
            try {
              const res = await axios.post("/api/v1/dang-nhap", {
                email: values.email,
                password: values.password,
              });
              if (res.status === 200) {
                localStorage.setItem("token", `Bearer ${res.data.token}`);
              }
              console.log(res);
            } catch (error) {
              if (error.response) {
                children.setErrors("msg", error.response.data.msg);
              }
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="field-input">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <div className="error-display">
                  {errors.email && touched.email && errors.email}
                </div>
              </div>
              <div className="field-input">
                <label htmlFor="password">Mật Khẩu</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <div className="error-display">
                  {errors.password && touched.password && errors.password}
                </div>
              </div>
              <div>{errors.msg && errors.msg}</div>
              <button
                className="submit-btn"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    </StyledPage>
  );
};

export default SignInPage;
