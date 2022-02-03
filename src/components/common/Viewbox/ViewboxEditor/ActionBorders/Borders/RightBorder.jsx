import React from "react";

const RightBorder = ({
  actionRef,
  imageOffsets,
  setCreatingObj,
  setCurrentObjFirst,
  setCurrentObjSecond,
}) => {
  const onMouseDownRight = (e) => {
    const initialStyle = actionRef.current.getBoundingClientRect();
    setCreatingObj(true);
    setCurrentObjFirst({
      x: initialStyle.x - imageOffsets.x,
      y: initialStyle.y - imageOffsets.y,
    });
    setCurrentObjSecond({
      x: e.pageX - imageOffsets.x - 8,
      y: initialStyle.bottom - imageOffsets.y - 8,
    });
    document.addEventListener("mousemove", resizeRight);
    document.addEventListener("mouseup", onResizeRightFinished);
  };

  const resizeRight = (e) => {
    if (e.clientX <= imageOffsets.x2 - 4) {
      setCurrentObjSecond((prev) => ({
        ...prev,
        x: e.clientX - imageOffsets.x,
      }));
    } else {
      setCurrentObjSecond((prev) => ({
        ...prev,
        x: imageOffsets.x2 - imageOffsets.x - 4,
      }));
    }
  };

  const onResizeRightFinished = () => {
    setCreatingObj(false);
    document.removeEventListener("mousemove", resizeRight);
    document.removeEventListener("mouseup", onResizeRightFinished);
  };

  return (
    <div
      className="viewbox__action-border viewbox__action-border--right"
      onMouseDown={(e) => {
        onMouseDownRight(e);
      }}
    ></div>
  );
};

export default RightBorder;
