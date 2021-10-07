import React from "react";
import { useModal } from "./ModalContext";

const Overlay = () => {
  const [modalID, setModalID] = useModal();

  if (modalID) {
    return <div className="overlay" onClick={() => setModalID()}></div>;
  }

  return <></>;
};

export default Overlay;
