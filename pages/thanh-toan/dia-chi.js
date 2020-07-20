import React, { useState } from "react";
import styled from "styled-components";
import Dropdown from "react-dropdown";
import { Formik, Field } from "formik";
import { useRouter } from "next/router";
import optsProvinces from "../../constants/opts-provinces.json";
import optsDistricts from "../../constants/opts-districts.json";
import optsWards from "../../constants/opts-wards.json";
import { useAuth } from "../../contexts/userContext";
import { useCart } from "../../contexts/cartContext";

import Header from "../../components/Navigation/Header";
import Sidebar from "../../components/Checkout/Sidebar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

const StyledPage = styled.main`
  min-height: 100vh;

  .container {
    padding: ${({ theme }) => `${theme.spacing["8"]} 0`};
    ${({ theme }) => theme.maxWidths.desktop};
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-column-gap: 2rem;
    grid-template-rows: 1fr;

    .main,
    .side {
      ${({ theme }) => theme.borderRadius["rounded"]};
      ${({ theme }) => theme.shadow.base};
      background-color: white;
      min-height: 10rem;
      width: 100%;
    }

    .main {
      padding: ${({ theme }) => `${theme.spacing["6"]} ${theme.spacing["8"]}`};

      .field {
        display: grid;
        grid-template-columns: 1fr 3fr;
        grid-column-gap: ${({ theme }) => theme.spacing["4"]};
        margin-bottom: ${({ theme }) => theme.spacing["3"]};

        .field-label,
        .field-input {
          align-self: center;
          
        }
        .title-select-input {
          margin-right:${({ theme }) => theme.spacing["4"]};
          input {
            transform: translateY(-2px);
            margin-right:${({ theme }) => theme.spacing["2"]};
          }
        }

        .field-label {
          justify-self: flex-end;
        }

        .field-text-input {
          width: 100%;
          max-width: 30rem;
          border-radius: 1rem;
          padding: ${({ theme }) =>
            `${theme.spacing["3"]} ${theme.spacing["6"]}`};
            border: 1px solid rgba(0,0,0,0.1);
        }
      }
      .dropdown,
      .dropdown .Dropdown-control {
        /* ${({ theme }) => theme.borderRadius["rounded-full"]};*/
         border-radius: 1rem;
         width: 100%;
        max-width: 30rem;
      }
      .dropdown .Dropdown-control {
        padding: ${({ theme }) =>
          `${theme.spacing["3"]} ${theme.spacing["6"]}`};
      }
      .dropdown .Dropdown-menu {
        max-height: 50vh;
      }
      .dropdown .Dropdown-arrow-wrapper {
        position: absolute;
        right: 1rem;
        top: 30%;
        svg {
          color: ${({ theme }) => theme.colors.gray["500"]};
        }
      }
      .dropdown.is-open {
        .Dropdown-control {
          border: ${({ theme }) => `1px solid ${theme.colors.green["400"]}`};
        }
      }

      .submit-btn {
        background-color: ${({ theme }) => theme.colors.green["500"]};
        padding:${({ theme }) => `${theme.spacing["3"]} ${theme.spacing["6"]}`};
        border-radius: 1rem;
        width: 100%;
        max-width: 20rem;

        text-align: center;
        color: white;
        font-weight: 600;
      }
    }

    .side {

      .side-heading {
        margin:${({ theme }) => `${theme.spacing["2"]}`};
        padding:${({ theme }) => `${theme.spacing["3"]} ${theme.spacing["4"]}`};
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(0,0,0,0.1);
      }
    }
  }
`;

const CheckoutStep2Page = () => {
  const [fullAddress, setFullAddress] = useState({
    province: "Thành phố Hồ Chí Minh",
    district: "Quận 1",
    ward: "Phường Tân Định",
  });
  const { authenticated } = useAuth();
  const {
    modalIsOpen,
    openCartModal,
    closeCartModal,
    setDeliveryInfo,
  } = useCart();

  const router = useRouter();

  function editCartHandler() {
    if (authenticated) {
      router.push("/me");
    } else {
      openCartModal();
    }
  }

  const initialValues = {
    title: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    province: "79",
    district: "760",
    ward: "26734",
  };

  return (
    <>
      <Header />
      <StyledPage>
        <div className="container">
          <div className="main">
            <Formik
              initialValues={initialValues}
              validate={(values) => {
                const errors = {};
                if (!values.title) {
                  errors.title = "Khai Tâm nên gọi bạn như thế nào?";
                } else if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Email Không Hợp Lệ";
                } else if (!values.name) {
                  errors.name = "Vui Lòng Nhập Họ & Tên";
                } else if (!values.phone) {
                  errors.phone = "Vui Lòng Nhập Số Điện Thoại";
                } else if (!values.address) {
                  errors.address = "Vui Lòng Nhập Địa Chỉ";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                let deliveryInfo = {
                  title: values.title,
                  name: values.name,
                  email: values.email,
                  phone: values.phone,
                  fullAddress:
                    values.address +
                    ", " +
                    fullAddress.ward +
                    ", " +
                    fullAddress.district +
                    "," +
                    fullAddress.province,
                };
                console.log(deliveryInfo);
                setDeliveryInfo(deliveryInfo);
                localStorage.setItem(
                  "deliveryInfo",
                  JSON.stringify(deliveryInfo)
                );
                setSubmitting(false);
                router.push("/thanh-toan/dat-mua");
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
                setValues,
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <div></div>
                    <div>
                      <label className="title-select-input">
                        <Field type="radio" name="title" value="Anh" />
                        Anh
                      </label>
                      <label className="title-select-input">
                        <Field type="radio" name="title" value="Chị" />
                        Chị
                      </label>
                    </div>
                  </div>
                  <div className="field">
                    <label className="field-label" htmlFor="name">
                      Họ & Tên:
                    </label>
                    <input
                      className="field-text-input"
                      type="name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    {errors.name && touched.name && errors.name}
                  </div>
                  <div className="field">
                    <label className="field-label" htmlFor="email">
                      Email:
                    </label>
                    <input
                      className="field-text-input"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    {errors.email && touched.email && errors.email}
                  </div>
                  <div className="field">
                    <label className="field-label" htmlFor="phone">
                      Số Điện Thoại:
                    </label>
                    <input
                      className="field-text-input"
                      type="phone"
                      name="phone"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phone}
                    />
                    {errors.phone && touched.phone && errors.phone}
                  </div>
                  <div className="field">
                    <label className="field-label" htmlFor="address">
                      Số Nhà & Đường:
                    </label>
                    <input
                      className="field-text-input"
                      type="address"
                      name="address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address}
                    />
                    {errors.address && touched.address && errors.address}
                  </div>
                  <div className="field">
                    <label className="field-label" htmlFor="province">
                      Tỉnh/Thành Phố:
                    </label>
                    <Dropdown
                      className="dropdown field-input"
                      arrowClosed={<FontAwesomeIcon icon={faAngleDown} />}
                      arrowOpen={<FontAwesomeIcon icon={faAngleUp} />}
                      options={optsProvinces}
                      // onChange={(e) => onProviceOptionsHandler(e.value)}
                      onChange={(e) => {
                        setValues({
                          ...values,
                          province: e.value,
                          district: optsDistricts[e.value][0].value,
                          ward:
                            optsWards[optsDistricts[e.value][0].value][0].value,
                        });
                        setFullAddress({
                          ...fullAddress,
                          province: e.label,
                        });
                      }}
                      value={values.province}
                      placeholder="Select an option"
                    />
                  </div>
                  <div className="field">
                    <label className="field-label" htmlFor="province">
                      Quận/Huyện:
                    </label>
                    <Dropdown
                      className="dropdown  field-input"
                      arrowClosed={<FontAwesomeIcon icon={faAngleDown} />}
                      arrowOpen={<FontAwesomeIcon icon={faAngleUp} />}
                      options={optsDistricts[values.province]}
                      // onChange={(e) => onDistrictOptionsHandler(e.value)}
                      onChange={(e) => {
                        setValues({
                          ...values,
                          district: e.value,
                          ward: optsWards[e.value][0].value,
                        });
                        setFullAddress({
                          ...fullAddress,
                          district: e.label,
                        });
                      }}
                      value={values.district}
                      placeholder="Select an option"
                    />
                  </div>
                  <div className="field">
                    <label className="field-label" htmlFor="province">
                      Phường/Xã:
                    </label>
                    <Dropdown
                      className="dropdown  field-input"
                      arrowClosed={<FontAwesomeIcon icon={faAngleDown} />}
                      arrowOpen={<FontAwesomeIcon icon={faAngleUp} />}
                      options={optsWards[values.district]}
                      // onChange={(e) => onWardOptionsHandler(e.value)}
                      onChange={(e) => {
                        setValues({ ...values, ward: e.value });
                        setFullAddress({
                          ...fullAddress,
                          ward: e.label,
                        });
                      }}
                      value={values.ward}
                      placeholder="Select an option"
                    />
                  </div>
                  <div className="field">
                    <div></div>
                    <div>
                      <button
                        className="submit-btn"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Tiếp Tục
                      </button>
                    </div>
                  </div>
                  {errors.password && touched.password && errors.password}
                </form>
              )}
            </Formik>
          </div>
          <aside className="side">
            <Sidebar requireCartInfo={true} requireDeliveryInfo={false} />
          </aside>
        </div>
      </StyledPage>
    </>
  );
};

export default CheckoutStep2Page;
