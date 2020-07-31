import styled from "styled-components";

const StyledFieldProvider = styled.div`
    position: relative;

    .field__label {
      margin: ${({ theme }) => `${theme.spacing["3"]} 0 ${theme.spacing["1"]}`};
      label {
          font-size:${({ theme }) => theme.fontSizes.xm};
      }
    }
    
    input[type="text"],
    textarea,
    select {
        ${({ theme }) => theme.borderRadius["rounded"]};
        /* ${({ theme }) => theme.shadow.inner}; */
        border: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
        padding: ${({ theme }) =>
          `${theme.spacing["2"]} ${theme.spacing["4"]}`};
        /* background-color: ${({ theme }) => theme.colors.gray["900"]}; */
        background-color: rgba(252,252,252,1);
        width: 100%;
        font-size:${({ theme }) => theme.fontSizes.sm};

        &::placeholder {
          color: ${({ theme }) => theme.colors.gray["700"]};
        }
    }

    textarea {
      height: 100%;
    }

    input[type="textarea"] {

    }

    select {
        cursor:pointer;
    }
  
    .field__label {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .field__label-newValue input {
            margin-right: ${({ theme }) => theme.spacing["1"]};
            cursor:pointer;
        }
    }
    .field__label label {
        color: ${({ theme }) => theme.colors.gray["300"]};
    }

    .touched {
        border:${({ theme }) =>
          `1px solid ${theme.colors.gray["400"]} !important`};
        background-color:${({ theme }) =>
          `${theme.colors.gray["900"]} !important`};
    }

    /* .field__input {
      position: relative;
    } */

    .field__input-dropdown-arrow {
      position: absolute;
      height: 100%;
      top: 35%;
      right: 0;
      padding-right: 1rem;
      svg {
        color: ${({ theme }) => theme.colors.gray["600"]};
      }
    }
    .field__select-drop {
      ${({ theme }) => theme.shadow.base};
      z-index: 100;
      background-color: white;
      position: absolute;
    

      option {
        background-color: white;
        cursor: pointer;
        padding:${({ theme: { spacing } }) =>
          `${spacing["2"]} ${spacing["3"]}`};
          border-bottom:${({ theme }) =>
            `1px solid ${theme.colors.border.default}`};
      }

      option:hover {
        background-color:${({ theme }) => theme.colors.gray["900"]};
      }
    }
    
  `;

export default StyledFieldProvider;
