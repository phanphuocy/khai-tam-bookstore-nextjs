import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { withSize } from "react-sizeme";
import Button from "../atomics/Button";

const StyledLayout = styled.div`
  display: grid;
  grid-template-columns: 18rem 1fr 18rem;
  grid-template-rows: auto;
  grid-column-gap: ${({ theme }) => theme.spacing["4"]};

  /* Styling */
  background-color: white;

  .layout__aside {
    border: 1px solid green;
    background-color: ${({ theme }) => theme.colors.neutral["900"]};
  }

  .layout__main {
    border: 1px solid green;
  }
`;

const SmLayout = styled.div`
  /* Styling */
  background-color: white;

  .layout__aside {
    position: fixed;
    height: 100vh;
    width: 75vw;
    top: 0;
    left: 0;
    z-index: 10;

    /* Styling */
    background-color: ${({ theme }) => theme.colors.neutral["900"]};
  }

  .layout__aside__right {
    left: auto;
    right: 0;
  }

  .layout__mask {
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    z-index: 5;
    background-color: rgba(0, 0, 0, 0.1);
  }

  .sidebars-controls {
    display: flex;
    justify-content: space-between;
  }
`;

const OneMainTwoSidebars = ({
  size,
  children,
  sideLabel1,
  sideComponent1,
  sideLabel2,
  sideComponent2,
}) => {
  const [showSidebar, setShowSidebar] = useState("");

  if (size.width <= 600) {
    return (
      <SmLayout>
        {showSidebar == "left" && (
          <aside className="layout__aside layout__aside__left">
            {sideComponent1}
          </aside>
        )}
        <main className="layout__main">
          <div className="sidebars-controls">
            <Button label={sideLabel1} onClick={() => setShowSidebar("left")} />
          </div>
          {children}
        </main>
        {showSidebar == "right" && (
          <aside className="layout__aside layout__aside__right"></aside>
        )}
        {showSidebar == "right" ||
          (showSidebar == "left" && (
            <div
              className="layout__mask"
              onClick={() => setShowSidebar("")}
            ></div>
          ))}
      </SmLayout>
    );
  }

  return (
    <StyledLayout>
      <aside className="layout__aside layout__aside__left">
        {sideComponent1}
      </aside>
      <main className="layout__main">{children}</main>
      <aside className="layout__aside layout__aside__right"></aside>
    </StyledLayout>
  );
};

export default withSize()(OneMainTwoSidebars);
