import React from "react";

const LeftBorder = ({
  actionRef,
  imageOffsets,
  setCreatingObj,
  setCurrentObjFirst,
  setCurrentObjSecond,
}) => {
  const onMouseDownLeft = (e) => {
    const initialStyle = actionRef.current.getBoundingClientRect();
    setCreatingObj(true);
    setCurrentObjFirst({
      x: e.pageX - imageOffsets.x,
      y: initialStyle.y - imageOffsets.y,
    });
    setCurrentObjSecond({
      x: initialStyle.right - imageOffsets.x - 8,
      y: initialStyle.bottom - imageOffsets.y - 8,
    });
    document.addEventListener("mousemove", resizeLeft);
    document.addEventListener("mouseup", onResizeLeftFinished);
  };

  const resizeLeft = (e) => {
    if (e.clientX >= imageOffsets.x - 4) {
      setCurrentObjFirst((prev) => ({
        ...prev,
        x: e.clientX - imageOffsets.x,
      }));
    } else {
      setCurrentObjFirst((prev) => ({
        ...prev,
        x: -4,
      }));
    }
  };

  const onResizeLeftFinished = () => {
    setCreatingObj(false);
    document.removeEventListener("mousemove", resizeLeft);
    document.removeEventListener("mouseup", onResizeLeftFinished);
  };

  return (
    <div
      className="viewbox__action-border viewbox__action-border--left"
      onMouseDown={(e) => {
        onMouseDownLeft(e);
      }}
    ></div>
  );
};

export default LeftBorder;
