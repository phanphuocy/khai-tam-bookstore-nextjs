import React from "react";
import { useField, Field } from "formik";
import PropTypes from "prop-types";
import StyledFieldProvider from "../providers/StyledFieldProvider";

const SimpleTextAreaField = ({ label, name, placeholder, ...props }) => {
  const [field, meta, helpers] = useField(props);
  return (
    <StyledFieldProvider>
      <div className="field__label">
        <label htmlFor={name}>{label}</label>
      </div>
      <Field
        rows="30"
        cols="50"
        as="textarea"
        type="text"
        name={name}
        placeholder={placeholder || "..."}
        className={
          meta.initialValue[name] !== meta.value[name] ? "touched" : ""
        }
      />
    </StyledFieldProvider>
  );
};

SimpleTextAreaField.propTypes = {};

export default SimpleTextAreaField;
