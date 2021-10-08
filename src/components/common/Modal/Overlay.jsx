import React from "react";

import { useModal } from "./ModalContext";
import {
  MODAL_FINISH_PLAY_ID,
  MODAL_FINISH_TEST_ID,
} from "../../../utils/constants/modals";

const Overlay = () => {
  const [modalID, setModalID] = useModal();

  const exceptions = [MODAL_FINISH_PLAY_ID, MODAL_FINISH_TEST_ID];

  if (modalID && exceptions.includes(modalID)) {
    return <div className="overlay"></div>;
  }

  if (modalID) {
    return <div className="overlay" onClick={() => setModalID()}></div>;
  }

  return <></>;
};

export default Overlay;
