import React, { useState, useEffect } from "react";
import styled from "styled-components";
import categories from "../../generated/categories.json";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";

import categoryName from "../../names/categoryName.json";

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
    border-bottom: ${({ theme }) => `1px solid ${theme.colors.border.default}`};

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
    background-color: ${({ theme }) => theme.colors.green["500"]};
    a {
      color: ${({ theme }) => theme.colors.gray["900"]};
    }
    .indicator {
      color: ${({ theme }) => theme.colors.green["300"]};
    }
  }
  .subcategory-container {
    /* background-color: ${({ theme }) => theme.colors.green["900"]}; */
    padding: ${({ theme }) => `${theme.spacing["1"]} 0`};
    overflow-y: hidden;
    border-top:${({ theme }) => `1px dashed ${theme.colors.border.default}`};
    border-bottom:${({ theme }) => `1px dashed ${theme.colors.border.default}`};
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({ theme }) => theme.colors.gray["100"]};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  .category-label {
    color: ${({ theme }) => theme.colors.gray["100"]};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const CategoriesNav = () => {
  const [active, setActive] = useState("");
  const [opening, setOpening] = useState("");

  function headingClickedHandler(slug) {
    if (slug === active) {
      setActive("");
    } else {
      setActive(slug);
    }
  }

  const {
    query: { category },
  } = useRouter();

  const paramsCategory = category;

  useEffect(() => {
    //
    // When page load, check for active slug and display it onto navbar
    //
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].slug == paramsCategory) {
        setActive(categories[i].slug);
        break;
      } else {
        for (let u = 0; u < categories[i].children.length; u++) {
          if (categories[i].children[u].slug == paramsCategory) {
            setOpening(categories[i].slug);
            setActive(categories[i].children[u].slug);
            break;
          }
        }
      }
    }
  }, []);

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
                <a className="category-label">{categoryName[category.slug]}</a>
              </Link>
              <FontAwesomeIcon
                className="indicator"
                icon={active === category.slug ? faAngleUp : faAngleDown}
              ></FontAwesomeIcon>
            </div>
            {(active === category.slug || opening === category.slug) && (
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
                      category === item.slug || paramsCategory === item.slug
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link href="/[subcategory]" as={`/${item.slug}`}>
                      <a className="subcategory-label">
                        <span>{categoryName[item.slug]}</span>
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
