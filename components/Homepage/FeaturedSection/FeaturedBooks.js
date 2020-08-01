import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { urlFor } from "../../../database/sanity";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../atomics/Button";
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

const FeaturedBooks = ({ items, size }) => {
  const [curr, setCurr] = useState(0);
  const [fullDescription, setFullDescription] = useState(false);
  items = [items[items.length - 1], ...items, items[0]];
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
      <div className="slides__container">
        <motion.ul
          className="slides"
          animate={{ x: -width / 4 + (-curr * width) / 2 }}
          transition={{ inertia: 100 }}
        >
          {items.map((item, index) => (
            <li
              className="slides__item item"
              key={item.slug + index}
              // animate={{ x: `${index * 0}%` }}
              style={{ width: width / 2 }}
            >
              <div className="item__visual">
                <picture>
                  <source
                    srcSet={urlFor(item.image)
                      .width(600)
                      .height(500)
                      .format("webp")}
                  />
                  <img
                    src={urlFor(item.image).width(600).height(500)}
                    width="100%"
                  />
                </picture>

                {index === curr + 1 && (
                  <div className="item__visual-description">
                    <p>
                      {fullDescription || item.description.length < 255
                        ? item.description
                        : item.description.substring(0, 255).concat("..")}{" "}
                      {!fullDescription && (
                        <a onClick={() => setFullDescription(true)}>Đọc tiếp</a>
                      )}
                    </p>
                  </div>
                )}
              </div>

              {index === curr + 1 && (
                <div className="slides__item-info">
                  <h3>{item.title}</h3>
                </div>
              )}
            </li>
          ))}
        </motion.ul>
      </div>

      <div className="slides__actions-left-btn">
        <Button
          icon={faChevronLeft}
          onClick={() => handleButtons(curr - 1)}
          disabled={curr === 0}
        ></Button>
      </div>
      <div className="slides__actions-right-btn">
        <Button
          icon={faChevronRight}
          onClick={() => handleButtons(curr + 1)}
        ></Button>
      </div>
    </StyledComp>
  );
};

export default withSize()(FeaturedBooks);
