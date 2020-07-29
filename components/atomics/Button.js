import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  height: 100%;
  ${({ theme }) => theme.borderRadius["rounded"]};
  ${({ theme }) => theme.shadow["sm"]};
  background-color: ${(props) =>
    props.primary
      ? props.theme.colors.green["500"]
      : props.theme.colors.gray["900"]};
  border: ${(props) =>
    props.primary
      ? `2px solid ${props.theme.colors.green["400"]}`
      : `2px solid ${props.theme.colors.border.default}`};
  border-top: ${(props) =>
    props.primary
      ? `2px solid ${props.theme.colors.green["500"]}`
      : `2px solid ${props.theme.colors.gray["700"]}`};
  border-bottom: ${(props) =>
    props.primary
      ? `2px solid ${props.theme.colors.green["400"]}`
      : `2px solid ${props.theme.colors.gray["700"]}`};
  color: ${(props) =>
    props.primary
      ? props.theme.colors.green["900"]
      : props.theme.colors.gray["300"]};
  padding: ${({ theme: { spacing } }) => `${spacing["2"]} ${spacing["3"]}`};

  &:hover,
  &:active {
    ${({ theme }) => theme.shadow["sm"]};
    background-color: ${(props) =>
      props.primary
        ? props.theme.colors.green["400"]
        : props.theme.colors.gray["900"]};

    border-top: ${(props) =>
      props.primary
        ? `2px solid ${props.theme.colors.green["400"]}`
        : `2px solid ${props.theme.colors.gray["600"]}`};
    border-bottom: ${(props) =>
      props.primary
        ? `2px solid ${props.theme.colors.green["500"]}`
        : `2px solid ${props.theme.colors.gray["600"]}`};
    ${({ theme }) => theme.shadow.inner};
    color: ${(props) =>
      props.primary
        ? props.theme.colors.green["800"]
        : props.theme.colors.gray["400"]};
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled,
  &[disabled] {
    background-color: ${(props) =>
      props.primary
        ? props.theme.colors.green["400"]
        : props.theme.colors.gray["800"]};
    color: ${(props) =>
      props.primary
        ? props.theme.colors.green["800"]
        : props.theme.colors.gray["600"]};
    .icon {
      svg {
        color: ${(props) =>
          props.primary
            ? props.theme.colors.green["900"]
            : props.theme.colors.gray["600"]};
      }
    }
  }

  .icon {
    margin-right: ${({ theme }) => theme.spacing["1"]};
    svg {
      transform: translateY(-1px);
      color: ${(props) =>
        props.primary
          ? props.theme.colors.green["900"]
          : props.theme.colors.gray["400"]};
    }
  }
`;

const Button = ({ label, onClick, primary, icon, disabled }) => {
  return (
    <div style={{ display: "flex" }}>
      <StyledButton
        disabled={disabled}
        primary={primary}
        onClick={() =>
          typeof onClick === "function"
            ? onClick()
            : console.log("There are no functions assigned to this button")
        }
      >
        {icon && (
          <span className="icon">
            <FontAwesomeIcon icon={icon} />
          </span>
        )}
        <span className="label">{label}</span>
      </StyledButton>
    </div>
  );
};

export default Button;
