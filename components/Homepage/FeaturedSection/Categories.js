import React, { useState } from "react";
import styled from "styled-components";
import bookCategories from "../../../constants/book-categories";
import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

const StyledCategories = styled.div`
  .section-heading {
    margin: ${({ theme }) => theme.spacing["4"]};
    padding: ${({ theme }) => `0 ${theme.spacing["2"]}`};
  }
  .category-heading {
    padding: ${({ theme }) => `${theme.spacing["2"]} ${theme.spacing["2"]}`};
    margin: ${({ theme }) => `${theme.spacing["2"]} ${theme.spacing["4"]}`};
    border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray["600"]}`};

    .indicator {
      margin-left: ${({ theme }) => theme.spacing["2"]};
      color: ${({ theme }) => theme.colors.green["500"]};
    }
  }
  .category-heading:hover,
  .category-heading:active {
    ${({ theme }) => theme.borderRadius["rounded"]};
    background-color: ${({ theme }) => theme.colors.gray["800"]};
    cursor: pointer;
  }
  .category-heading.active {
    .indicator {
      color: ${({ theme }) => theme.colors.green["300"]};
    }
  }
  .subcategory-container {
    background-color: ${({ theme }) => theme.colors.green["900"]};
    padding: ${({ theme }) => `${theme.spacing["1"]} 0`};
    overflow-y: hidden;
  }
  .subcategory-item {
    margin: ${({ theme }) => `${theme.spacing["1"]} ${theme.spacing["2"]}`};
    padding: ${({ theme }) => `${theme.spacing["2"]} ${theme.spacing["4"]}`};
    ${({ theme }) => theme.borderRadius["rounded"]};
  }
  .subcategory-item:hover,
  .subcategory-item:active {
    background-color: ${({ theme }) => theme.colors.green["500"]};
    cursor: pointer;

    .subcategory-label {
      color: ${({ theme }) => theme.colors.gray["900"]};
    }
  }
  .subcategory-label {
    color: ${({ theme }) => theme.colors.gray["100"]};
  }

  .category-label {
    color: ${({ theme }) => theme.colors.gray["100"]};
  }
`;

const Categories = () => {
  const [active, setActive] = useState("");

  function headingClickedHandler(slug) {
    if (slug === active) {
      setActive("");
    } else {
      setActive(slug);
    }
  }
  return (
    <StyledCategories>
      <p className="section-heading">Danh Mục Sách</p>
      <ul>
        {bookCategories.map((category) => (
          <li className="category-item" key={category.parentSlug}>
            <div
              className={`category-heading ${
                active === category.parentSlug ? "active" : ""
              }`}
              onClick={() => headingClickedHandler(category.parentSlug)}
            >
              <a className="category-label">{category.parent}</a>
              <FontAwesomeIcon
                className="indicator"
                icon={active === category.parentSlug ? faAngleUp : faAngleDown}
              ></FontAwesomeIcon>
            </div>
            {active === category.parentSlug && (
              <motion.ul
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                className="subcategory-container"
                transition={{ stiffness: 200 }}
              >
                {category.children.map((item) => (
                  <li key={item.slug} className="subcategory-item">
                    <a className="subcategory-label">{item.name}</a>
                  </li>
                ))}
              </motion.ul>
            )}
          </li>
        ))}
      </ul>
    </StyledCategories>
  );
};

export default Categories;
