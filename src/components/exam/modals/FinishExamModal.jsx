import React from "react";
import { Link } from "react-router-dom";

import Icon from "../../common/Icon/Icon";
import Modal from "../../common/Modal/Modal";

import ExamStore from "../../../store/exam";
import { useModal } from "../../common/Modal/ModalContext";
import { MODAL_FINISH_EXAM_ID } from "../../../utils/constants/modals";

const FinishExamModal = () => {
  const [modalID, setModalID] = useModal();

  if (modalID !== MODAL_FINISH_EXAM_ID) {
    return <></>;
  }

  return (
    <Modal>
      <div className="modal__icon-wrapper modal__icon-wrapper--positive">
        <Icon id="accept" width="64" />
      </div>
      <h2 className="modal__header">Сценарий изучен</h2>
      <p className="modal__warning-message">
        Он будет доступен в списке пройденных сценариев
      </p>
      <Link
        to="/user"
        className="button modal__button modal__button--cancel modal__button--lonely"
        onClick={() => {
          ExamStore.resetStore();
          setModalID();
        }}
      >
        Отлично!
      </Link>
    </Modal>
  );
};

export default FinishExamModal;
