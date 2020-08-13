import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const StyledComp = styled.div`
  display: inline-flex;

  .pagination__comp-error {
    padding: ${({ theme }) => `${theme.spacing["2"]} ${theme.spacing["3"]}`};
    ${({ theme }) => theme.borderRadius["rounded"]};
    border: ${({ theme }) => `1px solid ${theme.colors.text.warming}`};
    color: ${({ theme }) => theme.colors.text.warming};
    background-color: ${({ theme }) => theme.colors.background.yellowTint};
  }

  .pagination__container {
    ${({ theme }) => theme.shadow.inner};
    border-radius: 0.5rem;
    display: flex;
  }

  .pagination__button {
    min-width: 3rem;
    text-align: center;
    border: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
    background-color: ${({ theme }) => theme.colors.gray["900"]};
    padding: ${({ theme }) => `${theme.spacing["2"]} ${theme.spacing["3"]}`};
    color: ${({ theme }) => theme.colors.gray["300"]};

    &:hover:enabled {
      ${({ theme }) => theme.shadow.base};
      background: rgb(241, 241, 241);
      background: linear-gradient(
        0deg,
        rgba(241, 241, 241, 1) 0%,
        rgba(255, 255, 255, 1) 100%
      );
    }

    &.active {
      ${({ theme }) => theme.shadow.inner};
      border: ${({ theme }) => `1px solid ${theme.colors.gray["500"]}`};
      background-color: ${({ theme }) => theme.colors.gray["600"]};
      color: ${({ theme }) => theme.colors.gray["200"]};
    }

    &:disabled {
      ${({ theme }) => theme.shadow.inner};
      border: ${({ theme }) => `1px solid ${theme.colors.gray["500"]}`};
      background-color: ${({ theme }) => theme.colors.gray["600"]};
      color: ${({ theme }) => theme.colors.gray["400"]};
    }

    .pagination__button-icon {
      margin: 0;
      width: 2rem;
    }
  }

  .pagination__button:first-of-type {
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
  }

  .pagination__button:last-of-type {
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }

  .hide-on-not-mobile {
    display: none;
    ${({ theme }) => theme.breakpoints.sm} {
      display: block;
    }
  }

  .hide-on-mobile {
    display: block;
    ${({ theme }) => theme.breakpoints.sm} {
      display: none;
    }
  }
`;

const Pagination = ({
  total,
  curr,
  limit,
  routerPathname,
  routerQuery,
  showPageNumber,
}) => {
  //
  /* Inter-component data error-handle */
  if (!routerPathname) {
    return (
      <StyledComp>
        <p className="pagination__comp-error">No base path provided.</p>
      </StyledComp>
    );
  }
  if (!routerQuery) {
    return (
      <StyledComp>
        <p className="pagination__comp-error">No query object provided.</p>
      </StyledComp>
    );
  }
  //
  /* On initialization */
  const router = useRouter();

  let nbOfPages = Math.ceil(total / limit);
  let pages = [];
  for (let i = 1; i <= nbOfPages; i++) {
    if (i <= 3 || nbOfPages - i < 3 || i == curr) {
      pages.push({
        page: i,
        first: (i - 1) * limit + 1,
        last: i === nbOfPages ? total : i * limit,
      });
    }
  }

  //
  /* User interaction behaviors */
  function onButtonClickedHandler(toPage) {
    if (!toPage) {
      console.warn("No page specified.");
      return;
    }
    const paramPaths = routerPathname.split("/").filter((el) => el);
    let asPath = "";
    for (let i = 0; i < paramPaths.length; i++) {
      let param = paramPaths[i].replace("[", "").replace("]", "");
      asPath = asPath.concat("/").concat(routerQuery[param]);
    }
    let toPath = asPath + "?page=" + toPage;
    router.push(toPath);
  }

  return (
    <StyledComp>
      <div className="pagination__container">
        <button
          onClick={() => onButtonClickedHandler(parseInt(curr) - 1)}
          className="pagination__button"
          disabled={curr <= 1}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="hide-on-not-mobile pagination__button-icon"
          />
          <span className="hide-on-mobile">Trang Trước</span>
        </button>
        {pages.map((btn) => (
          <button
            onClick={() => onButtonClickedHandler(btn.page)}
            className={`pagination__button ${curr == btn.page ? "active" : ""}`}
            disabled={curr == btn.page}
          >
            {showPageNumber ? btn.page : `${btn.first} - ${btn.last}`}
          </button>
        ))}
        <button
          onClick={() => onButtonClickedHandler(parseInt(curr) + 1)}
          className="pagination__button"
          disabled={curr >= nbOfPages}
        >
          <span className="hide-on-mobile">Trang Tiếp Theo</span>
          <FontAwesomeIcon
            icon={faChevronRight}
            className="hide-on-not-mobile pagination__button-icon"
          />
        </button>
      </div>
    </StyledComp>
  );
};

Pagination.defaultProps = {
  total: 25,
  curr: 1,
  limit: 24,
  showPageNumber: true,
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  curr: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  routerPathaname: PropTypes.string.isRequired,
  routerQuery: PropTypes.object.isRequired,
  showPageNumber: PropTypes.bool,
};

export default Pagination;
