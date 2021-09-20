import React from "react";

const Icon = (props) => {
  const { id, width, height, className } = props;

  const realHeight = height ? height : width;

  return (
    <svg className={className} width={width} height={realHeight}>
      <use xlinkHref={id} />
    </svg>
  );
};

export default Icon;
