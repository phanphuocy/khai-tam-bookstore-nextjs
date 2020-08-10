import React, { useState } from "react";
import styled from "styled-components";
import headerLinks from "../../constants/header-links";
import bookCategories from "../../constants/book-categories";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const items = [
  {
    group: "Danh Mục Sách",
    groupVal: "danh-muc-sach",
    items: bookCategories.map((cat) => ({
      value: cat.parentSlug,
      label: cat.parent,
      url: "/" + cat.parentSlug,
    })),
  },
  ...headerLinks,
];

const StyledItems = styled.ul`
  overflow-y: scroll;

  .float {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .root-item {
    border: 1px solid orange;
    padding: ${({ theme }) => `${theme.spacing["3"]} ${theme.spacing["4"]}`};

    .root-item__chevon {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: ${({ theme }) => theme.spacing["2"]};
    }
  }

  .root-item__label {
    position: relative;
    text-transform: uppercase;
    font-weight: 600;
  }

  .second-item {
    padding: ${({ theme }) => `${theme.spacing["2"]} 0`};
  }
`;

const Group = ({ value, label, items, isOpening, setSelected }) => (
  <li className="root-item" key={value}>
    <div className="root-item__label" onClick={() => setSelected(value)}>
      {label}
      <span className="float root-item__chevon">
        <FontAwesomeIcon icon={faChevronDown} />
      </span>
    </div>
    {isOpening && (
      <ul>
        {items.map((item) => (
          <li className="second-item" key={item.value}>
            <Link href={item.url || "/" + item.value}>
              <a>{item.label}</a>
            </Link>
          </li>
        ))}
      </ul>
    )}
  </li>
);

const Single = ({ value, label }) => (
  <li className="root-item root-item__label" key={value}>
    <Link href={`/${value}`}>
      <a>{label}</a>
    </Link>
  </li>
);

const MenuItems = () => {
  const [selected, setSelected] = useState("");

  console.log(items);
  return (
    <StyledItems>
      {items.map((item) =>
        item.group ? (
          <Group
            value={item.groupVal}
            label={item.group}
            items={item.items}
            isOpening={item.groupVal == selected}
            setSelected={setSelected}
          />
        ) : (
          <Single value={item.value} label={item.label} />
        )
      )}
    </StyledItems>
  );
};
export default MenuItems;
