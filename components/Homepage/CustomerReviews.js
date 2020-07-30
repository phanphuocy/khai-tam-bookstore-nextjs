import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../atomics/Button";
import { withSize } from "react-sizeme";

import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const StyledComp = styled.div`
  ${({ theme }) => theme.maxWidths.desktop};
  position: relative;

  .slides__container {
    display: flex;
    overflow: hidden;

    .slides {
      display: flex;

      .slides__item {
        padding: ${({ theme: { spacing } }) =>
          `${spacing["2"]} ${spacing["3"]}`};
        width: 100%;
        /* border: 1px solid green; */
        .slides__item-info {
          padding-top: ${({ theme }) => theme.spacing["4"]};
          h3 {
            text-align: center;
            font-family: ${({ theme }) => theme.fonts.serif};
          }
        }
      }
    }
  }
  .slides__actions-left-btn {
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${({ theme }) => `0 ${theme.spacing["4"]}`};
  }
  .slides__actions-right-btn {
    position: absolute;
    height: 100%;
    top: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${({ theme }) => `0 ${theme.spacing["4"]}`};
  }

  .item {
    .item__visual {
      position: relative;

      .item__visual-description {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        display: flex;
        align-items: flex-end;

        p {
          padding: 1rem;
          background-color: rgba(0, 0, 0, 0.5);
          color: ${({ theme }) => theme.colors.gray["900"]};
        }
        a {
          color: ${({ theme }) => theme.colors.green["600"]};
        }
      }
    }
  }
`;

const CustomerReviews = ({ items, size }) => {
  const [curr, setCurr] = useState(0);
  let { width } = size;

  function handleButtons(goTo) {
    if (goTo < 0) {
      setCurr(0);
    } else if (goTo > items.length - 3) {
      setCurr(0);
    } else {
      setCurr(goTo);
    }
    setFullDescription(false);
  }
  return (
    <StyledComp>
      <iframe
        src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FAmarahIshtarSaphira%2Fposts%2F2665573900163485&width=500"
        width="500"
        height="199"
        style="border:none;overflow:hidden"
        scrolling="no"
        frameborder="0"
        allowTransparency="true"
        allow="encrypted-media"
      ></iframe>
    </StyledComp>
  );
};

export default withSize()(CustomerReviews);
