import React from "react";
import { Link } from "react-router-dom";
import { useCloseModal } from "./CloseModalContext";

import Modal from "../../common/Modal/Modal";

const CloseModal = () => {
  const [closeModal, toggle] = useCloseModal();

  if (!closeModal) {
    return <></>;
  }

  return (
    <>
      <Modal>
        <div className="modal__icon-wrapper">
          <svg width="64" height="64">
            <use xlinkHref="#warning"></use>
          </svg>
        </div>
        <h2 className="modal__header">Закрыть сценарий</h2>
        <p className="modal__warning-message">
          Прогресс выполнения не будет сохранен
        </p>
        <Link to="/user" className="button modal__button-close">
          Закрыть
        </Link>
        <button
          className="button modal__button-cancel"
          type="button"
          onClick={() => toggle()}
        >
          Отмена
        </button>
      </Modal>
      <div className="overlay"></div>
    </>
  );
};

export default CloseModal;
