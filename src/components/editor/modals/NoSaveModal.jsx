import React from "react";

import { useModal } from "../../common/Modal/ModalContext";
import Icon from "../../common/Icon/Icon";
import Modal from "../../common/Modal/Modal";

const NoSaveModal = () => {
  const [modalID, setModalID] = useModal();

  if (modalID !== "no-save") {
    return <></>;
  }

  return (
    <Modal>
      <div className="modal__icon-wrapper">
        <Icon id="warning" width="64" />
      </div>
      <h2 className="modal__header">Выйти без сохранения?</h2>
      <p className="modal__warning-message">
        Все внесенные изменения будут утеряны.
      </p>
      <button
        className="button modal__button modal__button--action"
        type="button"
      >
        Не сохранять
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

export default NoSaveModal;
