import React from "react";
import styled from "styled-components";
import { Formik } from "formik";

const StyledPage = styled.main`
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .container {
    ${({ theme }) => theme.shadow.base};
    ${({ theme }) => theme.borderRadius["rounded"]};
    background-color: white;
    max-width: 50rem;
    width: 100%;
    margin: 0 auto;
    min-height: 4rem;
    padding: ${({ theme }) => `${theme.spacing["12"]} ${theme.spacing["8"]}`};
    display: flex;
    flex-direction: column;
    align-items: center;

    .header {
      padding: ${({ theme }) => `0 0 ${theme.spacing["4"]}`};
    }

    form {
      display: inline-block;

      .field-input {
        display: flex;
        flex-direction: column;

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
    }
  }
`;

const SignInPage = () => {
  return (
    <StyledPage>
      <div className="container">
        <div className="header">
          <h1>Đăng Nhập</h1>
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
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
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
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && errors.email}
              </div>
              <div className="field-input">
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && errors.password}
              </div>
              <button type="submit" disabled={isSubmitting}>
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
