import React from "react";
import { Link } from "react-router-dom";

import Icon from "../../common/Icon/Icon";
import Modal from "../../common/Modal/Modal";

import ProfileStore from "../../../store/profile";
import { useModal } from "../../common/Modal/ModalContext";
import { MODAL_NO_SAVE_PROFILE_ID } from "../../../utils/constants/modals";

const NoSaveProfileModal = () => {
  const [modalID, setModalID] = useModal();

  if (modalID !== MODAL_NO_SAVE_PROFILE_ID) {
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
        to="/user"
        className="button modal__button modal__button--action"
        onClick={() => {
          ProfileStore.resetStore();
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

export default NoSaveProfileModal;
