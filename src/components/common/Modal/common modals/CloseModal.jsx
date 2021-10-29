import React from "react";
import { Link } from "react-router-dom";

import Icon from "../../../common/Icon/Icon";
import Modal from "../Modal";

import { useModal } from "../ModalContext";
import PlayerStore from "../../../../store/player";
import ExamStore from "../../../../store/exam";
import { MODAL_CLOSE_ID } from "../../../../utils/constants/modals";

const CloseModal = ({ isExam }) => {
  const [modalID, setModalID] = useModal();

  if (modalID !== MODAL_CLOSE_ID) {
    return <></>;
  }

  const resetStore = () =>
    isExam ? ExamStore.resetStore() : PlayerStore.resetStore();

  return (
    <Modal>
      <div className="modal__icon-wrapper">
        <Icon id="warning" width="64" />
      </div>
      <h2 className="modal__header">Закрыть сценарий</h2>
      <p className="modal__warning-message">
        Прогресс выполнения не будет сохранен
      </p>
      <Link
        to="/user"
        className="button modal__button modal__button--action"
        onClick={() => {
          resetStore();
          setModalID();
        }}
      >
        Закрыть
      </Link>
      <button
        className="button modal__button modal__button--cancel"
        type="button"
        onClick={() => setModalID()}
      >
        Отмена
      </button>
    </Modal>
  );
};

export default CloseModal;
