import React from "react";
import { Formik, Form, Field } from "formik";
import styled from "styled-components";

const StyledForm = styled.div`
  label {
    margin: ${({ theme }) => `${theme.spacing["3"]} 0`};
  }
  .bottom-spacing {
    margin-bottom: ${({ theme }) => theme.spacing["2"]};
  }
  input[type="text"],
  input[type="number"],
  select {
    ${({ theme }) => theme.borderRadius["rounded"]};
    /* ${({ theme }) => theme.shadow.inner}; */
    border: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
    padding: ${({ theme }) => `${theme.spacing["3"]} ${theme.spacing["4"]}`};
    /* background-color: ${({ theme }) => theme.colors.gray["900"]}; */
    background-color: rgba(252,252,252,1);
    width: 100%;
  }

  .field {
    .field__label {
      /* padding: ${({ theme }) => `0 ${theme.spacing["2"]}`}; */
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .field__label label {
      color: ${({ theme }) => theme.colors.gray["300"]};
    }
  }

  .two-equal-columns {
      display: flex;
        .two-equal-columns__item {
            width: 50%;
            padding-right: ${({ theme }) => theme.spacing["4"]};

            input[type="number"] {
              width: 100%;
            }
        }
        .two-columns__item:last-child {
            padding-right: 0;
        }
  }

  label.discounted-rate {
      padding:${({ theme }) => `${theme.spacing["2"]} ${theme.spacing["3"]}`};
        cursor:pointer;

      input {
          margin-right:${({ theme }) => theme.spacing["1"]};
      }

      &:first-of-type {
          padding-left: 0;
      }
  }

  .form-action {
      border-top: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
      margin: ${({ theme }) => `${theme.spacing["4"]} 0 0`};
      padding: ${({ theme }) => `${theme.spacing["4"]} 0 0`};
      display: flex;
     justify-content: space-between;

      button.form-action__reset-button {
          ${({ theme }) => theme.borderRadius.rounded};
        background-color: ${({ theme }) => theme.colors.gray["700"]};
        padding:${({ theme }) => `${theme.spacing["2"]} ${theme.spacing["3"]}`};
      }
  }
`;

const AdminBookPricingForm = ({ book }) => {
  const initialValues = {
    discounted: book.prices.discounted ? book.prices.discounted : null,
    whole: book.prices.whole ? book.prices.whole : null,
    discountedRate: book.prices.discountedRate
      ? book.prices.discountedRate.toString()
      : 0,
  };

  const rates = [0, 5, 10, 15, 20, 25, 30, 35];

  return (
    <StyledForm>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {(props) => (
          <>
            <Form>
              <div className="two-equal-columns">
                <div className="field two-equal-columns__item">
                  <div className="field__label">
                    <label htmlFor="discounted">Giá Bán</label>
                  </div>
                  <Field
                    type="number"
                    min={0}
                    name="discounted"
                    placeholder=""
                  />
                </div>
                <div className="field two-equal-columns__item">
                  <div className="field__label">
                    <label htmlFor="whole">Giá Bìa</label>
                  </div>
                  <Field type="number" min={0} name="whole" placeholder="" />
                </div>
              </div>
              <div className="field">
                <div className="field__label">
                  <label>{`Giảm Giá: ${props.values.discountedRate}%`}</label>
                </div>
                {rates.map((rate) => (
                  <label className="discounted-rate">
                    <Field
                      type="radio"
                      name="discountedRate"
                      value={rate.toString()}
                      onClick={() => {
                        props.setFieldValue("discountedRate", rate);
                        props.setFieldValue(
                          "discounted",
                          (props.values.whole * (100 - parseInt(rate))) / 100
                        );
                      }}
                    />
                    {`${rate}%`}
                  </label>
                ))}
              </div>
            </Form>
            <div className="form-action">
              <button
                className="form-action__reset-button"
                onClick={props.handleReset}
              >
                Đặt Lại
              </button>
            </div>
          </>
        )}
      </Formik>
    </StyledForm>
  );
};

export default AdminBookPricingForm;
