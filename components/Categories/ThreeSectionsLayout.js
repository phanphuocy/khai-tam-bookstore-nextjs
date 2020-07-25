import React from "react";
import styled from "styled-components";
import CategoriesNav from "./CategoriesNav";

const StyledLayout = styled.main`
  ${({ theme }) => theme.maxWidths.maximum};
  display: grid;
  background-color: white;
  border: ${({ theme }) => theme.borders.base};

  .categories {
    grid-area: categories;
    background-color: white;
  }

  .content {
    grid-area: content;
  }

  .filters {
    grid-area: filter;
    ${({ theme }) => theme.borderRadius["rounded"]};
    background-color: white;

    .section-header-container {
      padding: ${({ theme }) => `0 ${theme.spacing["2"]}`};
      margin: ${({ theme }) => `${theme.spacing["4"]} ${theme.spacing["4"]}`};
    }
    .filter-group {
      padding: ${({ theme }) => `0 ${theme.spacing["2"]}`};
      margin: ${({ theme }) => `${theme.spacing["4"]} ${theme.spacing["4"]}`};

      p {
        border-bottom: 1px solid gray;
        margin-bottom: ${({ theme }) => theme.spacing["2"]};
      }
      ul {
        li {
          margin-bottom: ${({ theme }) => theme.spacing["2"]};

          span.count {
            font-size: ${({ theme }) => theme.fontSizes.sm};
            margin-left: ${({ theme }) => theme.spacing["1"]};
            color: ${({ theme }) => theme.colors.gray["500"]};
          }
        }
      }
    }
  }

  ${({ theme }) => theme.breakpoints.laptop} {
    grid-template-columns: 2fr 7fr;
    grid-column-gap: ${({ theme }) => theme.spacing["8"]};
    grid-template-rows: repeat(3, auto);
    grid-row-gap: ${({ theme }) => theme.spacing["4"]};
    grid-template-areas:
      "categories content"
      "filter content"
      ". content";
  }
`;

const ThreeSectionsLayout = ({ children, filter }) => {
  return (
    <StyledLayout>
      <div className="categories">
        <CategoriesNav />
      </div>
      <div className="content">{children}</div>
      <div className="filters">
        <div className="section-header-container">
          <p>Bộ Lọc Trong Danh Mục</p>
        </div>
        {/* {Object.keys(filter).map((group, i) => (
          <div className="filter-group" key={group}>
            <p>{Object.keys(filter)[i]}</p>
            <ul>
              {filter[Object.keys(filter)[i]].map((item) => (
                <li>
                  <small>
                    <span className="value">{item["_id"]}</span>
                    <span className="count">{`(${item["count"]})`}</span>
                  </small>
                </li>
              ))}
            </ul>
          </div>
        ))} */}
      </div>
    </StyledLayout>
  );
};

export default ThreeSectionsLayout;
