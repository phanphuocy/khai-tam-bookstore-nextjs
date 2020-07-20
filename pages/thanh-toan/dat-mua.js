import React, { useEffect, useState } from "react";
import Header from "../../components/Navigation/Header";
import styled from "styled-components";
import { Formik } from "formik";

import { useCart } from "../../contexts/cartContext";
import { useAuth } from "../../contexts/userContext";

import Sidebar from "../../components/Checkout/Sidebar";

const StyledPage = styled.main`
  .container {
    ${({ theme }) => theme.maxWidths.desktop};
    padding: ${({ theme }) => `${theme.spacing["12"]} 0`};
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-column-gap: 2rem;

    .section {
      ${({ theme }) => theme.borderRadius["rounded"]};
      border: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
      background-color: white;
      min-height: 10rem;
    }
  }
`;

const CheckoutStep3Page = () => {
  const { items, deliveryInfo } = useCart();
  const { authenticated, user } = useAuth();

  let lsDeliveryInfo;
  let lsCartItems;

  useEffect(() => {
    lsDeliveryInfo = JSON.parse(localStorage.getItem("deliveryInfo"));
    lsCartItems = JSON.parse(localStorage.getItem("cartItems"));

    if (!lsDeliveryInfo || lsCartItems.length === 0) {
      console.log("ITS WRONG");
    }
  }, []);

  return (
    <>
      <Header />
      <StyledPage>
        <div className="container">
          <div id="main" className="section">
            <Formik
              initialValues={{}}
              onSubmit={(values, { setSubmitting }) => {
                let order = {
                  deliveryInfo: lsDeliveryInfo,
                  cartItems: items,
                  isUserAuthenticated: authenticated,
                  user: user,
                };
                console.log(order);
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
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                </form>
              )}
            </Formik>
          </div>
          <aside id="sidebar" className="section">
            <Sidebar requireDeliveryInfo={true} requireCartInfo={true} />
          </aside>
        </div>
      </StyledPage>
    </>
  );
};

export default CheckoutStep3Page;
