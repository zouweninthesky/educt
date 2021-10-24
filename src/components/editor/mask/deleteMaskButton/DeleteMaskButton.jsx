import React from "react";
import "./DeleteMaskButton.scss"
import Icon from "../../../common/Icon/Icon";
import { calculateBottomRight, calculateTopLeft } from "../../../../utils/calculateMaskCoords";

const DeleteMaskButton = ({onDeleteMask, firstPoint, secondPoint}) => {
  const topLeft = calculateTopLeft(firstPoint, secondPoint);
  const bottomRight = calculateBottomRight(firstPoint, secondPoint);

  return (
    <button className="mask__delete-button"
            style={{
              left: `calc(${bottomRight.x}px  - (1.75rem / 2))`,
              top: `calc(${topLeft.y}px - (1.75rem / 2))`
            }}
            onClick={(e) => {
              e.stopPropagation();
              onDeleteMask();
            }}
    >
      < Icon id="close" width="24px" />
    </button>
  )
}

export default DeleteMaskButton;