import React from "react";

import { useModal } from "../../../common/Modal/ModalContext";
import Icon from "../../../common/Icon/Icon";
import Modal from "../../../common/Modal/Modal";
import { MODAL_DELETE_SCRIPT_ID } from "../../../../utils/constants/modals";
import Scripts from "../../../../store/scripts";

const DeleteScriptModal = () => {
  const [modalID, setModalID] = useModal();

  if (modalID !== MODAL_DELETE_SCRIPT_ID) {
    return <></>;
  }

  return (
    <Modal>
      <div className="modal__icon-wrapper">
        <Icon id="trash" width="64" />
      </div>
      <h2 className="modal__header">Удалить сценарий?</h2>
      <p className="modal__warning-message">
        Сценарий и результаты его прохождения будут удалены безвозвратно.
      </p>
      <button
        className="button modal__button modal__button--action"
        type="button"
        onClick={() => {
          Scripts.scriptDelete();
          setModalID();
        }}
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

export default DeleteScriptModal;
