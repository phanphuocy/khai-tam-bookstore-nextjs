import React from "react";

const OneMainTwoSidebars = ({ children }) => {
  return (
    <div>
      {React.Children.map(children, (child, index) => (
        <pre key={index}>{child}</pre>
      ))}
    </div>
  );
};

export default OneMainTwoSidebars;
