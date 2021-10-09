import React from "react";
import "./Modal.scss";

const Modal = (props) => {
  const className = props.modifier ? `modal modal--${props.modifier}` : "modal";

  return <div className={className}>{props.children}</div>;
};

export default Modal;
