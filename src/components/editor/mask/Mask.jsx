import React from "react";
import "./Mask.scss";
import { calculateTopLeft, calculateBottomRight } from "../../../utils/calculateMaskCoords";
import EditorStore from "../../../store/editor";
import {toJS} from "mobx"
import { observer } from "mobx-react-lite";

const Mask = observer(({ firstPoint, secondPoint, current, shrinkRatio }) => {

  const topLeft = calculateTopLeft(firstPoint, secondPoint, shrinkRatio);
  const bottomRight = calculateBottomRight(firstPoint, secondPoint, shrinkRatio);

  return (
    <div className='mask' style={{
      top: topLeft.y + "px",
      left: topLeft.x + "px",
      width: (bottomRight.x - topLeft.x) + "px",
      height: (bottomRight.y - topLeft.y) + "px"
    }}>
    </div>
  );
});

export default Mask;