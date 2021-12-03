import React from "react";
import { observer } from "mobx-react-lite";
import "./Mask.scss";

import EditorMain from "../../../store/editorMain";

import {
  calculateTopLeft,
  calculateBottomRight,
} from "../../../utils/calculateMaskCoords";

const Mask = observer(({ firstPoint, secondPoint, shrinkRatio }) => {
  const topLeft = calculateTopLeft(firstPoint, secondPoint, shrinkRatio);
  const bottomRight = calculateBottomRight(
    firstPoint,
    secondPoint,
    shrinkRatio
  );

  return (
    <div
      className="mask"
      style={{
        top: topLeft.y + "px",
        left: topLeft.x + "px",
        width: bottomRight.x - topLeft.x + "px",
        height: bottomRight.y - topLeft.y + "px",
      }}
    ></div>
  );
});

export default Mask;
