import React from "react";
import "./ProgressBar.scss";

import { useModal } from "../../../common/Modal/ModalContext";
import {
  MODAL_INTRO_PLAYER_ID,
  MODAL_INTRO_EXAM_ID,
} from "../../../../utils/constants/modals";

const ProgressBar = ({ current, total }) => {
  const [modalID] = useModal();

  if (modalID === MODAL_INTRO_PLAYER_ID || modalID === MODAL_INTRO_EXAM_ID) {
    return <></>;
  }

  const style = {
    width: `${((current + 1) / total) * 100}%`,
  };

  return (
    <div className="progress-bar">
      <div className="progress-bar__progress" style={style}></div>
    </div>
  );
};

export default ProgressBar;
