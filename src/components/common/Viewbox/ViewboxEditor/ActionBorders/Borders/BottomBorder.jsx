import React from "react";

const BottomBorder = ({
  actionRef,
  imageOffsets,
  setCreatingObj,
  setCurrentObjFirst,
  setCurrentObjSecond,
}) => {
  const onMouseDownBottom = (e) => {
    const initialStyle = actionRef.current.getBoundingClientRect();
    setCreatingObj(true);
    setCurrentObjFirst({
      x: initialStyle.x - imageOffsets.x,
      y: initialStyle.y - imageOffsets.y,
    });
    setCurrentObjSecond({
      x: initialStyle.right - imageOffsets.x - 8,
      y: e.pageY - imageOffsets.y - 8,
    });
    document.addEventListener("mousemove", resizeBottom);
    document.addEventListener("mouseup", onResizeBottomFinished);
  };

  const resizeBottom = (e) => {
    if (e.clientY <= imageOffsets.y2 - 4) {
      setCurrentObjSecond((prev) => ({
        ...prev,
        y: e.clientY - imageOffsets.y,
      }));
    } else {
      setCurrentObjSecond((prev) => ({
        ...prev,
        y: imageOffsets.y2 - imageOffsets.y - 4,
      }));
    }
  };

  const onResizeBottomFinished = () => {
    setCreatingObj(false);
    document.removeEventListener("mousemove", resizeBottom);
    document.removeEventListener("mouseup", onResizeBottomFinished);
  };

  return (
    <div
      className="viewbox__action-border viewbox__action-border--bottom"
      onMouseDown={(e) => {
        onMouseDownBottom(e);
      }}
    ></div>
  );
};

export default BottomBorder;
