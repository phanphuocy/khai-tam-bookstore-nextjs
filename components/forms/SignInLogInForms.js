import React from "react";
import styled from "styled-components";
import { Formik, Field } from "formik";
import Button from "../atomics/Button";
import useAPI from "../../hooks/useAPI";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useAuth } from "../../contexts/userContext";

const StyleProvider = styled.div`
  form {
    width: 100%;
    max-width: 30rem;

    .field {
      display: flex;
      flex-direction: column;

      label.field__label {
        padding: ${({ theme }) =>
          `${theme.spacing["2"]} ${theme.spacing["1"]}`};
      }

      input.field__input {
        border-bottom: ${({ theme }) =>
          `1px solid ${theme.colors.border.default}`};
        padding: ${({ theme }) =>
          `${theme.spacing["3"]} ${theme.spacing["4"]}`};
        &:hover {
          background-color: ${({ theme }) => theme.colors.gray["900"]};
        }
        &:focus {
          border-bottom: ${({ theme }) =>
            `1px solid ${theme.colors.green["500"]}`};
          background-color: ${({ theme }) => theme.colors.gray["900"]};
        }
      }
      div.field__error {
        padding: ${({ theme }) =>
          `${theme.spacing["2"]} ${theme.spacing["1"]}`};

        .field__error-text {
          color: ${({ theme }) => theme.colors.text.warming};
        }
      }
    }
  }
  .form__status {
    ${({ theme }) => theme.borderRadius["rounded"]};
    border: ${({ theme }) => `1px solid ${theme.colors.text.warming}`};
    background-color: ${({ theme }) => theme.colors.background.yellowTint};
    padding: ${({ theme }) => `${theme.spacing["2"]} ${theme.spacing["4"]}`};
    color: ${({ theme }) => theme.colors.text.warming};
    margin-bottom: ${({ theme }) => theme.spacing["4"]};
  }
`;

const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Tên không nên ngắn hơn 2 kí tự!")
    .max(50, "Tên không nên dài hơn 50 kí tự!")
    .required("Vui lòng nhập họ và tên"),
  email: Yup.string()
    .email("Email vừa rồi không hợp lệ")
    .required("Vui lòng nhập địa chỉ email"),
  password: Yup.string()
    .min(2, "Mật khẩu quá ngắn!")
    .max(30, "Mật khẩu không nên dài hơn 30 kí tự!")
    .required("Vui lòng nhập mật khẩu"),
  passwordRepeat: Yup.string().required("Vui lòng nhập lại mật khẩu"),
  passwordRepeat: Yup.mixed().test(
    "match",
    "Mật khẩu nhập lại không trùng khớp",
    function (value) {
      return value === this.parent.passwordRepeat;
    }
  ),
});

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email vừa rồi không hợp lệ")
    .required("Vui lòng nhập địa chỉ email"),
  password: Yup.string()
    .min(2, "Mật khẩu quá ngắn!")
    .max(30, "Mật khẩu không nên dài hơn 30 kí tự!")
    .required("Vui lòng nhập mật khẩu"),
});

const SignUpForm = () => {
  const router = useRouter();
  const { setUser } = useAuth();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
  };

  async function handleSignup(values, children) {
    try {
      const res = await useAPI.post("/api/v1/dang-ky", {
        name: values.name,
        email: values.email,
        password: values.password,
      });

      if (res.status === 200) {
        localStorage.setItem("token", `Bearer ${res.data.token}`);
      }
      setUser(res.data.user);
      router.push("/");
    } catch (error) {
      console.log(error.response);
      if (error.response) {
        children.setStatus(error.response.data.msg);
      }
    }
  }

  return (
    <StyleProvider bgUrl="images/hisu-lee-SrkuyPb3aUk-unsplash.jpg">
      <Formik
        initialValues={initialValues}
        validationSchema={SignUpSchema}
        validateOnBlur={true}
        onSubmit={handleSignup}
      >
        {({ values, errors, status, touched, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="field__label" htmlFor="name">
                Họ & Tên
              </label>
              <Field className="field__input" type="name" name="name" />
              <div className="field__error">
                {errors.name && touched.name && (
                  <p className="field__error-text">{errors.name}</p>
                )}
              </div>
            </div>
            <div className="field">
              <label className="field__label" htmlFor="email">
                Email
              </label>
              <Field className="field__input" type="email" name="email" />
              <div className="field__error">
                {errors.email && touched.email && (
                  <p className="field__error-text">{errors.email}</p>
                )}
              </div>
            </div>
            <div className="field">
              <label className="field__label" htmlFor="password">
                Mật Khẩu
              </label>
              <Field className="field__input" type="password" name="password" />
              <div className="field__error">
                {errors.password && touched.password && (
                  <p className="field__error-text">{errors.password}</p>
                )}
              </div>
            </div>
            <div className="field">
              <label className="field__label" htmlFor="passwordRepeat">
                Nhập Lại Mật Khẩu
              </label>
              <Field
                className="field__input"
                type="password"
                name="passwordRepeat"
              />
              <div className="field__error">
                {errors.passwordRepeat && touched.passwordRepeat && (
                  <p className="field__error-text">{errors.passwordRepeat}</p>
                )}
              </div>
            </div>
            {status ? (
              <div className="form__status">
                <p>{status}</p>
              </div>
            ) : null}

            <Button
              type="submit"
              disabled={isSubmitting}
              onClick={() => handleSubmit()}
              label="Đăng Ký"
              primary
            />
          </form>
        )}
      </Formik>
    </StyleProvider>
  );
};

const SignInForm = () => {
  const router = useRouter();
  const { setUser } = useAuth();

  async function signInHandler(values, children) {
    try {
      const res = await useAPI.post("/api/v1/dang-nhap", {
        email: values.email,
        password: values.password,
      });
      if (res.status === 200) {
        localStorage.setItem("token", `Bearer ${res.data.token}`);
        setUser(res.data.user);
        router.push("/");
      }
    } catch (error) {
      console.log(error.response);
      if (error.response) {
        children.setStatus(error.response.data.msg);
      }
    }
  }
  return (
    <StyleProvider>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignInSchema}
        onSubmit={signInHandler}
      >
        {({ errors, touched, status, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="field__label" htmlFor="email">
                Email
              </label>
              <Field className="field__input" type="email" name="email" />
              <div className="field__error">
                {errors.email && touched.email && (
                  <p className="field__error-text">{errors.email}</p>
                )}
              </div>
            </div>
            <div className="field">
              <label className="field__label" htmlFor="password">
                Mật Khẩu
              </label>
              <Field className="field__input" type="password" name="password" />
              <div className="field__error">
                {errors.password && touched.password && (
                  <p className="field__error-text">{errors.password}</p>
                )}
              </div>
            </div>
            {status ? (
              <div className="form__status">
                <p>{status}</p>
              </div>
            ) : null}
            <Button
              type="submit"
              disabled={isSubmitting}
              onClick={() => handleSubmit()}
              label="Đăng Nhập"
              primary
            />
          </form>
        )}
      </Formik>
    </StyleProvider>
  );
};

export { SignUpForm, SignInForm };
