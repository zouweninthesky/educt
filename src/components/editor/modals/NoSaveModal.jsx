import React from "react";
import { Link } from "react-router-dom";

import Icon from "../../common/Icon/Icon";
import Modal from "../../common/Modal/Modal";

import EditorStore from "../../../store/editor";
import { useModal } from "../../common/Modal/ModalContext";
import { MODAL_NO_SAVE_ID } from "../../../utils/constants/modals";

const NoSaveModal = () => {
  const [modalID, setModalID] = useModal();

  if (modalID !== MODAL_NO_SAVE_ID) {
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
      <Link
        to="/author"
        className="button modal__button modal__button--action"
        onClick={() => {
          EditorStore.resetStore();
          setModalID();
        }}
      >
        Не сохранять
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

export default NoSaveModal;
