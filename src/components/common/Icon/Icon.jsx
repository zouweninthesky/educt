import React from "react";

const Icon = ({ id, width, height, className }) => {
  const realHeight = height ? height : width;

  return (
    <svg className={className} width={width} height={realHeight}>
      <use xlinkHref={`#${id}`} />
    </svg>
  );
};

export default Icon;
