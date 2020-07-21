import React, { useState } from "react";
import styled from "styled-components";
import categories from "../../generated/categories.json";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";

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
  .category-heading:active,
  .category-heading.active {
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

    .nbBook {
      margin-left: ${({ theme }) => theme.spacing["4"]};
      padding: ${({ theme }) => theme.spacing["1"]};
      ${({ theme }) => theme.borderRadius["rounded"]};
    }
  }
  .subcategory-item:hover,
  .subcategory-item:active,
  .subcategory-item.active {
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

const CategoriesNav = () => {
  const [active, setActive] = useState("");

  function headingClickedHandler(slug) {
    if (slug === active) {
      setActive("");
    } else {
      setActive(slug);
    }
  }

  const {
    query: { subcategory, category },
  } = useRouter();

  const paramsCategory = category;

  return (
    <StyledCategories>
      <p className="section-heading">Danh Mục Sách</p>
      <ul>
        {categories.map((category) => (
          <li className="category-item" key={category.slug}>
            <div
              className={`category-heading ${
                active === category.slug || paramsCategory === category.slug
                  ? "active"
                  : ""
              }`}
              onClick={() => headingClickedHandler(category.slug)}
            >
              <Link href="/[category]" as={`/${category.slug}`}>
                <a className="category-label">{category.slug}</a>
              </Link>
              <FontAwesomeIcon
                className="indicator"
                icon={active === category.slug ? faAngleUp : faAngleDown}
              ></FontAwesomeIcon>
            </div>
            {active === category.slug && (
              <motion.ul
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                className="subcategory-container"
                transition={{ stiffness: 200 }}
              >
                {category.children.map((item) => (
                  <li
                    key={item.slug}
                    className={`subcategory-item ${
                      subcategory === item.slug ? "active" : ""
                    }`}
                  >
                    <Link
                      href="/[category]/[subcategory]"
                      as={`/${category.slug}/${item.slug}`}
                    >
                      <a className="subcategory-label">
                        {item.slug}
                        <span className="nbBook">{`(${item.nbBooks})`}</span>
                      </a>
                    </Link>
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

export default CategoriesNav;
