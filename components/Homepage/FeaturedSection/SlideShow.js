import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { urlFor } from "../../../database/sanity";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../atomics/Button";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const StyledContainer = styled.div`
  position: relative;

  ul.slides {
    overflow-y: hidden;
    position: relative;
    height: 330px;

    li.slides__item {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  }
  div.control {
    padding: ${({ theme }) => `${theme.spacing["2"]}`};
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button.control__button {
      padding: ${({ theme: { spacing } }) => `${spacing["2"]} ${spacing["1"]}`};
    }
  }
`;

const SlideShow = ({ data }) => {
  const [curr, setCurr] = useState(0);

  function setCurrSlide(index) {
    if (index <= 0) {
      setCurr(0);
    } else if (index >= data.length - 1) {
      setCurr(data.length - 1);
    } else {
      setCurr(index);
    }
  }

  return (
    // <div style={{ position: "relative", width: "100%" }}>
    //   <div style={{ marginTop: "35.714285714%" }}>
    <StyledContainer>
      <ul className="slides">
        {data.map((slide, index) => (
          <motion.li
            className="slides__item"
            key={slide.slug}
            animate={{ opacity: index === curr ? 1 : 0 }}
          >
            <picture>
              <source
                srcSet={urlFor(slide.image)
                  .width(931)
                  .height(330)
                  .format("webp")}
              />
              <img
                src={urlFor(slide.image).width(931).height(330).format("jpg")}
                alt={slide.label}
                width="100%"
              />
            </picture>
          </motion.li>
        ))}
      </ul>
      <div className="control">
        <Button
          className="control__button control__button--left"
          icon={faChevronLeft}
          onClick={() => setCurrSlide(curr - 1)}
          disabled={curr <= 0}
        >
          -
        </Button>
        <Button
          className="control__button control__button--right"
          icon={faChevronRight}
          onClick={() => setCurrSlide(curr + 1)}
          disabled={curr >= data.length - 1}
        >
          -
        </Button>
      </div>
    </StyledContainer>
    //   </div>
    // </div>
  );
};

SlideShow.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    }).isRequired
  ),
};
export default SlideShow;
