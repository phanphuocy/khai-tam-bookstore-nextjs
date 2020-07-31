import React, { useState } from "react";
import { useField, Field } from "formik";
import PropTypes from "prop-types";
import StyledFieldProvider from "../providers/StyledFieldProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const SimpleTextField = ({
  label,
  name,
  placeholder,
  onFieldLevelBlur,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  return (
    <StyledFieldProvider>
      <div className="field__label">
        <label htmlFor={name}>{label}</label>
      </div>
      <div className="field__input">
        <Field
          type="text"
          name={name}
          placeholder={placeholder || "..."}
          {...field}
          className={meta.initialValue !== meta.value ? "touched" : ""}
          onBlur={(e) => onFieldLevelBlur(name, e.currentTarget.value)}
        />
      </div>
    </StyledFieldProvider>
  );
};

SimpleTextField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export const SimpleTextFieldWithOptions = ({
  label,
  name,
  placeholder = label,
  options,
  checkFor,
  onFieldLevelBlur,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const [filtered, setFiltered] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  function filterWithRegrex(term) {
    if (term.length < 2) {
      setShowSuggestions(false);
      return;
    }
    let reg = new RegExp(term, "gi");
    let newArr = options.filter((el) => el != null && el.match(reg));
    console.log(newArr.length);
    setFiltered(newArr);
    setShowSuggestions(true);
  }

  return (
    <StyledFieldProvider>
      <div className="field__label">
        <label htmlFor={name}>{label}</label>
      </div>
      <div className="field__input">
        <Field
          className={meta.initialValue !== meta.value ? "touched" : ""}
          // disabled={!cfField.value}
          type="text"
          name={name}
          placeholder={placeholder}
          onBlur={(e) => onFieldLevelBlur(name, e.currentTarget.value)}
          onChange={(e) => {
            helpers.setValue(e.currentTarget.value);
            filterWithRegrex(e.currentTarget.value);
          }}
        />
      </div>
      {showSuggestions && (
        <div className="field__select-drop">
          {filtered.map((el, i) => (
            <option
              key={i}
              value={el}
              onClick={(e) => {
                helpers.setValue(e.target.value);
                setShowSuggestions(false);
              }}
            >
              {el}
            </option>
          ))}
        </div>
      )}
    </StyledFieldProvider>
  );
};

export default SimpleTextField;
