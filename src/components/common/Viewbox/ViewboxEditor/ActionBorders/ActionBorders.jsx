import React from "react";
import "../../Viewbox.scss";

import TopBorder from "./Borders/TopBorder";
import RightBorder from "./Borders/RightBorder";
import BottomBorder from "./Borders/BottomBorder";
import LeftBorder from "./Borders/LeftBorder";

const ActionBorders = (props) => {
  return (
    <>
      <TopBorder {...props} />
      <RightBorder {...props} />
      <BottomBorder {...props} />
      <LeftBorder {...props} />
    </>
  );
};

export default ActionBorders;
