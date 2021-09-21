import React from "react";

import { useModal } from "../../common/Modal/ModalContext";
import Icon from "../../common/Icon/Icon";
import Modal from "../../common/Modal/Modal";

const DeleteModal = () => {
  const [modalID, setModalID] = useModal();

  if (modalID !== "delete") {
    return <></>;
  }

  return (
    <Modal>
      <div className="modal__icon-wrapper">
        <Icon id="trash" width="64" />
      </div>
      <h2 className="modal__header">Удалить слайд?</h2>
      <p className="modal__warning-message">Слайд будет удален безвозвратно</p>
      <button
        className="button modal__button modal__button--action"
        type="button"
      >
        Удалить
      </button>
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

export default DeleteModal;
