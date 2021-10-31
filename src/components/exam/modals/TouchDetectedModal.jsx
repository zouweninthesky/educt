import React from "react";
import { Link } from "react-router-dom";

import Icon from "../../common/Icon/Icon";
import Modal from "../../common/Modal/Modal";

import ExamStore from "../../../store/exam";
import { useModal } from "../../common/Modal/ModalContext";
import { MODAL_TOUCH_DETECTED_ID } from "../../../utils/constants/modals";

const TouchDetectedModal = () => {
  const [modalID, setModalID] = useModal();

  if (modalID !== MODAL_TOUCH_DETECTED_ID) {
    return <></>;
  }

  return (
    <Modal>
      <div className="modal__icon-wrapper modal__icon-wrapper--warning">
        <Icon id="warning" width="64" />
      </div>
      <h2 className="modal__header">Вы воспользовались сенсорным экраном</h2>
      <p className="modal__warning-message">
        Сценарий содержит действия, которые могут неправильно сработать
        на&nbsp;вашем устройстве, попробуйте заново с вашего рабочего
        компьютера.
      </p>
      <Link
        to="/user"
        className="button modal__button modal__button--cancel modal__button--lonely"
        onClick={() => {
          ExamStore.resetStore();
          setModalID();
        }}
      >
        Вернуться позже
      </Link>
    </Modal>
  );
};

export default TouchDetectedModal;
