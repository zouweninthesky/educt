import React from "react";

import Icon from "../../common/Icon/Icon";
import Modal from "../../common/Modal/Modal";

import EditorMain from "../../../store/editorMain";
import { useModal } from "../../common/Modal/ModalContext";
import { MODAL_FIRST_SAVE_ID } from "../../../utils/constants/modals";

const FirstSaveModal = ({ savingFunction }) => {
  const [modalID, setModalID] = useModal();

  if (modalID !== MODAL_FIRST_SAVE_ID) {
    return <></>;
  }

  return (
    <Modal>
      <div className="modal__icon-wrapper modal__icon-wrapper--positive">
        <Icon id="show" width="64" />
      </div>
      <h2 className="modal__header">Опубликовать сценарий?</h2>
      <p className="modal__warning-message">
        Сценарий станет доступен всем пользователям в организации. Это действие
        нельзя отменить.
      </p>
      <button
        className="button modal__button modal__button--action modal__button--positive"
        type="button"
        onClick={async () => {
          savingFunction();
          EditorMain.scriptPublish();
          setModalID();
        }}
      >
        Опубликовать
      </button>
      <button
        className="button modal__button modal__button--cancel"
        type="button"
        onClick={async () => {
          savingFunction();
          setModalID();
        }}
      >
        Только сохранить
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

export default FirstSaveModal;
