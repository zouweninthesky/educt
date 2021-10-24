import React from "react";
import "./Mask.scss";
import { calculateTopLeft, calculateBottomRight } from "../../../utils/calculateMaskCoords";

const Mask = ({ firstPoint, secondPoint }) => {

  const topLeft = calculateTopLeft(firstPoint, secondPoint);
  const bottomRight = calculateBottomRight(firstPoint, secondPoint);

  return (
    <div className='mask' style={{
      top: topLeft.y + "px",
      left: topLeft.x + "px",
      width: (bottomRight.x - topLeft.x) + "px",
      height: (bottomRight.y - topLeft.y) + "px"
    }}>
    </div>
  );
};

export default Mask;