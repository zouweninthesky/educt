import React from "react";

const TopBorder = ({
  actionRef,
  imageOffsets,
  setCreatingObj,
  setCurrentObjFirst,
  setCurrentObjSecond,
}) => {
  const onMouseDownTop = (e) => {
    const initialStyle = actionRef.current.getBoundingClientRect();
    setCreatingObj(true);
    setCurrentObjFirst({
      x: initialStyle.x - imageOffsets.x,
      y: e.pageY - imageOffsets.y,
    });
    setCurrentObjSecond({
      x: initialStyle.right - imageOffsets.x - 8,
      y: initialStyle.bottom - imageOffsets.y - 8,
    });
    document.addEventListener("mousemove", resizeTop);
    document.addEventListener("mouseup", onResizeTopFinished);
  };

  const resizeTop = (e) => {
    if (e.clientY >= imageOffsets.y) {
      setCurrentObjFirst((prev) => ({
        ...prev,
        y: e.clientY - imageOffsets.y,
      }));
    } else {
      setCurrentObjFirst((prev) => ({
        ...prev,
        y: -4,
      }));
    }
  };

  const onResizeTopFinished = () => {
    setCreatingObj(false);
    document.removeEventListener("mousemove", resizeTop);
    document.removeEventListener("mouseup", onResizeTopFinished);
  };

  return (
    <div
      className="viewbox__action-border viewbox__action-border--top"
      onMouseDown={(e) => {
        onMouseDownTop(e);
      }}
    ></div>
  );
};

export default TopBorder;
