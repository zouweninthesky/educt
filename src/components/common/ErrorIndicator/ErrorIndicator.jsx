import React from "react";
import "./ErrorIndicator.scss";

const ErrorIndicator = (props) => {
  const error = props.error;

  if (error === null) {
    return <></>;
  }

  return <div className="error">{error.message}</div>;
};

export default ErrorIndicator;
