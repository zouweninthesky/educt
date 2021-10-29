import React from "react";

import Icon from "../../common/Icon/Icon";
import Modal from "../../common/Modal/Modal";

import { useModal } from "../../common/Modal/ModalContext";
import { MODAL_INTRO_EXAM_ID } from "../../../utils/constants/modals";

const IntroExamModal = () => {
  const [modalID, setModalID] = useModal();

  if (modalID !== MODAL_INTRO_EXAM_ID) {
    return <></>;
  }

  return <Modal>чо каво</Modal>;
};

export default IntroExamModal;
