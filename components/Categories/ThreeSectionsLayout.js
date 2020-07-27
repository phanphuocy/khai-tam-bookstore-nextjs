import React from "react";
import styled from "styled-components";
import CategoriesNav from "./CategoriesNav";

const StyledLayout = styled.main`
  ${({ theme }) => theme.maxWidths.desktop};
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
    padding: ${({ theme }) => `${theme.spacing["6"]} ${theme.spacing["4"]}`};

    .filters__heading {
      padding: ${({ theme }) => `0 ${theme.spacing["1"]}`};
    }

    ul,
    li {
      font-size: ${({ theme }) => theme.fontSizes.sm};
    }

    .filters__group {
      padding: ${({ theme }) => `${theme.spacing["2"]} 0`};

      .filters__group-heading {
        padding: ${({ theme }) =>
          `${theme.spacing["2"]} ${theme.spacing["1"]}`};
      }

      .filters__group-item {
        padding: ${({ theme }) =>
          `${theme.spacing["2"]} ${theme.spacing["1"]}`};
        display: flex;
        justify-content: space-between;

        &:hover,
        &:active {
          background-color: ${({ theme }) => theme.colors.gray["900"]};
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

const ThreeSectionsLayout = ({ children, filters }) => {
  return (
    <StyledLayout>
      <div className="categories">
        <CategoriesNav />
      </div>
      <div className="content">{children}</div>
      <div className="filters">
        <div className="filters__heading">
          <p>Bộ Lọc Trong Danh Mục</p>
        </div>
        <div className="filters__content">
          <ul>
            {filters.map((group) => (
              <li key={group.slug} className="filters__group">
                <div className="filters__group-heading">
                  <h6 className="filters__group-heading-label">{group.slug}</h6>
                </div>
                <ul className="filters__group-content">
                  {group.items.map((item) => (
                    <li className="filters__group-item">
                      <span>{item._id}</span>
                      <span>({item.count})</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
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
