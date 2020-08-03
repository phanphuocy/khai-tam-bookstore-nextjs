import React, { useEffect, useState } from "react";
import Header from "../../components/Navigation/Header";
import styled from "styled-components";
import { Formik, Field } from "formik";
import Link from "next/link";
import { useCart } from "../../contexts/cartContext";
import { useAuth } from "../../contexts/userContext";
import Button from "../../components/atomics/Button";
import Sidebar from "../../components/Checkout/Sidebar";
import useAPI from "../../hooks/useAPI";

const StyledPage = styled.main`
  .container {
    ${({ theme }) => theme.maxWidths.desktop};
    padding: ${({ theme }) => `${theme.spacing["12"]} 0`};
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-column-gap: 2rem;

    .container__main,
    .container__side {
      ${({ theme }) => theme.borderRadius["rounded"]};
      border: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
      background-color: white;
      min-height: 10rem;
    }

    .container__main {
      padding: ${({ theme }) => `${theme.spacing["8"]} ${theme.spacing["12"]}`};
    }
    .container__side {
      padding: ${({ theme }) => `${theme.spacing["2"]} ${theme.spacing["4"]}`};
    }
  }

  .form {
    section.form__section {
      /* padding:${({ theme: { spacing } }) =>
        `0 ${spacing["2"]} ${spacing["4"]}`}; */
      padding-bottom:${({ theme }) => theme.spacing["4"]};
      margin-bottom:${({ theme }) => theme.spacing["8"]};
      border-bottom:${({ theme }) =>
        `1px dashed ${theme.colors.border.default}`};

      .form__section-heading {
        margin-bottom:${({ theme }) => theme.spacing["2"]};
        color:${({ theme }) => theme.colors.green["500"]};
        padding: ${({ theme }) => `0 ${theme.spacing["2"]}`};
      }
    }

    section.form__actions {
      border-bottom: none;
      display: flex;
      justify-content: flex-end;
   
    }
  }

  div.field {
    margin-bottom:${({ theme }) => theme.spacing["3"]};
    div.field__inputs {
      display: flex;
      align-items: center;
      input.field__inputs-checkbox {
        margin: ${({ theme }) => theme.spacing["2"]};
        margin-bottom:${({ theme }) => theme.spacing["3"]};
      }
      label.field__inputs-label {
        ${({ theme }) => theme.borderRadius["rounded"]};
        margin-bottom:${({ theme }) => theme.spacing["1"]};
        padding: ${({ theme }) => theme.spacing["2"]};
        &:hover {
          /* background-color: ${({ theme }) => theme.colors.green["900"]}; */
          background-color: ${({ theme }) =>
            theme.colors.background.greenTint}; ;
        }
      }
    }

    .field__desc {
      ${({ theme }) => theme.borderRadius["rounded"]};
      border:${({ theme }) => `1px solid ${theme.colors.border.default}`};
      padding:${({ theme: { spacing } }) => `${spacing["4"]} ${spacing["8"]}`};
      transition: background-color 500ms, border 500ms ease;
    }

    .field__desc.selected {
      border:${({ theme }) => `1px solid ${theme.colors.text["success"]}`};
      background-color:${({ theme }) => theme.colors.background.greenTint};
    }
  }

  .text-field {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-auto-rows: repeat(2,auto);
    grid-template-areas: 
        "label input"
        ". .";
    grid-column-gap:${({ theme }) => theme.spacing["2"]};
    .text-field__label {
      grid-area: label;
      text-align: right;
      align-self:center;
  
    }
    .text-field__inputs {
      grid-area: input;
      .text-field__inputs-input {
        width: 100%;
        max-width: 30rem;
        padding: ${({ theme }) =>
          `${theme.spacing["3"]} ${theme.spacing["6"]}`};
        border-bottom: 1px solid rgba(0,0,0,0.1);
      }
    }
  }
  .textarea {
    #textarea__input {
      width: 100%;
      border: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
      padding: ${({ theme }) => `${theme.spacing["4"]} ${theme.spacing["6"]}`};
    }
  }
`;

const CheckoutStep3Page = () => {
  const { items, deliveryInfo, clearCart } = useCart();
  const { authenticated, userState } = useAuth();

  let lsDeliveryInfo;
  let lsCartItems;

  useEffect(() => {
    // lsDeliveryInfo = JSON.parse(localStorage.getItem("deliveryInfo"));
    // lsCartItems = JSON.parse(localStorage.getItem("cartItems"));
    // if (!lsDeliveryInfo || lsCartItems.length === 0) {
    //   console.log("ITS WRONG");
    // }
  }, []);

  let initialValues = {
    deliveryMethod: "standard",
    paymentMethod: "",
    vatCompanyName: "",
    vatAddress: "",
    vatTaxCode: "",
    note: "",
  };

  return (
    <>
      <Header />
      <StyledPage>
        <div className="container">
          <main className="container__main">
            <Formik
              initialValues={initialValues}
              validate={(values) => {
                const errors = {};
                if (!values.paymentMethod) {
                  errors.paymentMethod = "Required";
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                let order = {
                  delivery: deliveryInfo,
                  payment: values,
                  items: items,
                  withUser: authenticated,
                  user: userState || null,
                };
                console.log(order);
                let res = await useAPI.post("/api/v1/checkout", order);
                if (res.status == 200) {
                  alert("Successful");
                  localStorage.setItem("cartItems", JSON.stringify([]));
                  clearCart();
                  console.log(res.data.order);
                }
                setSubmitting(false);
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
              }) => (
                <form onSubmit={handleSubmit} className="form">
                  <section className="form__section">
                    <h5 className="form__section-heading">
                      Chọn gói giao hàng
                    </h5>
                    <div className="form__section-content field">
                      <div className="field__inputs">
                        <Field
                          className="field__inputs-checkbox"
                          type="radio"
                          id="deliveryMethod"
                          name="deliveryMethod"
                          value="standard"
                        />
                        <label
                          className="field__inputs-label"
                          htmlFor="deliveryMethod"
                        >
                          Chuyển thường đảm bảo
                        </label>
                      </div>
                      <div
                        className={`field__desc ${
                          values.deliveryMethod === "standard" ? "selected" : ""
                        }`}
                      >
                        <p>
                          <small>
                            (1-3 ngày ở HCM; 3-7 ngày làm việc ở Tỉnh, trừ cuối
                            tuần)
                          </small>
                        </p>
                      </div>
                      <div className="field__errors"></div>
                    </div>
                  </section>
                  <section className="form__section">
                    <h5 className="form__section-heading">
                      Chọn phương thức thanh toán
                    </h5>
                    <div className="form__section-content field">
                      <div className="field__inputs">
                        <Field
                          className="field__inputs-checkbox"
                          type="radio"
                          name="paymentMethod"
                          value="online"
                          id="paymentMethod-online"
                        />
                        <label
                          className="field__inputs-label"
                          htmlFor="paymentMethod-online"
                        >
                          Thanh toán bằng Internet banking hoặc thẻ ATM - không
                          COD
                        </label>
                      </div>
                      <div
                        className={`field__desc ${
                          values.paymentMethod === "online" ? "selected" : ""
                        }`}
                      >
                        <PlainPaymentNotes />
                      </div>
                    </div>

                    <div className="field">
                      <div className="field__inputs">
                        <Field
                          className="field__inputs-checkbox"
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          id="paymentMethod-cod"
                        />
                        <label
                          className="field__inputs-label"
                          htmlFor="paymentMethod-cod"
                        >
                          Thanh toán bằng tiền mặt khi nhận hàng
                        </label>
                      </div>
                      <div
                        className={`field__desc ${
                          values.paymentMethod === "cod" ? "selected" : ""
                        }`}
                      >
                        <p>
                          Đối với đơn hàng ngoài TP. Hồ Chí Minh có phí Bưu Điện
                          phụ thu
                        </p>
                      </div>
                      <div className="field__errors">
                        {errors["paymentMethod"] && touched["paymentMethod"] ? (
                          <p className="field__errors-text danger">
                            {errors["paymentMethod"]}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </section>
                  <section className="form__section">
                    <h5 className="form__section-heading">
                      Thông tin xuất hóa đơn (chỉ xuất VAT cho đơn hàng từ 500k,
                      hoặc cộng dồn từ 500k)
                    </h5>
                    <h6 className="form__section-subheading"></h6>
                    <div className="form__section-content text-field">
                      <label
                        className="text-field__label"
                        htmlFor="vatCompanyName"
                      >
                        Tên Công Ty
                      </label>
                      <div className="text-field__inputs">
                        <Field
                          className="text-field__inputs-input"
                          type="text"
                          name="vatCompanyName"
                        />
                      </div>
                      <div className="field__errors">
                        {errors["vatCompanyName"] &&
                        touched["vatCompanyName"] ? (
                          <p className="field__errors-text danger">
                            {meta.error}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="text-field">
                      <label className="text-field__label" htmlFor="vatAddress">
                        Địa chỉ
                      </label>
                      <div className="text-field__inputs">
                        <Field
                          className="text-field__inputs-input"
                          type="text"
                          name="vatAddress"
                        />
                      </div>
                      <div className="field__errors">
                        {errors["vatAddress"] && touched["vatAddress"] ? (
                          <p className="field__errors-text danger">
                            {meta.error}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="text-field">
                      <label className="text-field__label" htmlFor="vatTaxCode">
                        Mã số thuế
                      </label>
                      <div className="text-field__inputs">
                        <Field
                          className="text-field__inputs-input"
                          type="text"
                          name="vatTaxCode"
                        />
                      </div>
                      <div className="field__errors">
                        {errors["vatTaxCode"] && touched["vatTaxCode"] ? (
                          <p className="field__errors-text danger">
                            {meta.error}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </section>
                  <section className="form__section">
                    <h5 className="form__section-heading">Ghi chú (nếu có)</h5>
                    <div className="form__section-content textarea">
                      <Field
                        id="textarea__input"
                        as="textarea"
                        name="note"
                        row={10}
                      />
                      <div className="field__errors">
                        {errors["note"] && touched["note"] ? (
                          <p className="field__errors-text danger">
                            {meta.error}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </section>
                  <section className="form__section form__actions">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      label="Đặt Mua"
                      onClick={handleSubmit}
                      primary
                    />
                  </section>
                </form>
              )}
            </Formik>
          </main>
          <aside className="container__side">
            <Sidebar requireDeliveryInfo={true} requireCartInfo={true} />
          </aside>
        </div>
      </StyledPage>
    </>
  );
};

const PlainPaymentNotes = () => (
  <>
    <p>
      <small>
        Quý khách{" "}
        <strong>
          chỉ chuyển khoản khi được xác nhận có đủ sách qua điện thoại
        </strong>{" "}
        từ Khai Tâm.
      </small>
    </p>
    <p>
      <small>
        Thời gian chuyển khoản: tối đa trong <strong>2 ngày</strong> từ khi có
        xác nhận đủ sách.
      </small>
    </p>
    <p>
      <small>
        Nội dung chuyển khoản cần ghi: thanh toán đơn hàng{" "}
        <strong>mã xxx</strong> hoặc <strong>số điện thoại</strong> khi đặt sách
      </small>
    </p>
    <p>
      <small>
        Xem thông tin chuyển khoản của Khai Tâm{" "}
        <Link href="/ho-tro-mua-hang/phuong-thuc-thanh-toan">
          <a>tại đây.</a>
        </Link>
      </small>
    </p>
  </>
);

export default CheckoutStep3Page;
