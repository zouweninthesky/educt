import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

import Icon from "../../common/Icon/Icon";
import Modal from "../../common/Modal/Modal";

import Store from "../../../store";
import PlayerStore from "../../../store/player";
import ExamStore from "../../../store/exam";
import { useModal } from "../../common/Modal/ModalContext";
import { MODAL_FINISH_PLAY_ID } from "../../../utils/constants/modals";

const FinishPlayModal = ({ script }) => {
  const [modalID, setModalID] = useModal();
  const history = useHistory();

  if (modalID !== MODAL_FINISH_PLAY_ID) {
    return <></>;
  }

  return (
    <Modal modifier="wide">
      <h2 className="modal__header">Сценарий пройден!</h2>
      <div className="modal__button-wrapper modal__button-wrapper--big">
        <button
          className="modal__big-button modal__big-button--test"
          onClick={() => {
            Store.loadingStarted();
            PlayerStore.resetStore();
            history.push(`/exam/${script.UID}`);
          }}
          onTouchStart={() => {
            ExamStore.touchDetected();
            history.push(`/exam/${script.UID}`);
          }}
        >
          <Icon id="graduation" width="40" />
          <span>Тестирование</span>
        </button>
        <Link
          to="/user"
          className="modal__big-button modal__big-button--return"
          onClick={() => {
            PlayerStore.resetStore();
            setModalID();
          }}
        >
          <Icon id="arrow-left" width="40" />
          <span>Вернуться к сценариям</span>
        </Link>
      </div>
    </Modal>
  );
};

export default FinishPlayModal;
