import React from "react";
import styled from "styled-components";

const EvenColumnsLayout = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    React.Children.count(props.children) <= 0
      ? `repeat(2, 1fr)`
      : `repeat(${React.Children.count(props.children)}, 1fr)`};
`;

export default EvenColumnsLayout;
