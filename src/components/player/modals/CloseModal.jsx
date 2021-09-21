import React from "react";
import { Link } from "react-router-dom";

import { useModal } from "../../common/Modal/ModalContext";
import Icon from "../../common/Icon/Icon";
import Modal from "../../common/Modal/Modal";

const CloseModal = () => {
  const [modalID, setModalID] = useModal();

  if (modalID !== "close") {
    return <></>;
  }

  return (
    <Modal>
      <div className="modal__icon-wrapper">
        <Icon id="warning" width="64" />
      </div>
      <h2 className="modal__header">Закрыть сценарий</h2>
      <p className="modal__warning-message">
        Прогресс выполнения не будет сохранен
      </p>
      <Link to="/user" className="button modal__button modal__button--action">
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
