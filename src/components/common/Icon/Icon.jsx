import React from "react";

const Icon = (props) => {
  const { id, width, height } = props;

  return (
    <svg width={width} height={height}>
      <use xlinkHref={id} />
    </svg>
  );
};

export default Icon;
