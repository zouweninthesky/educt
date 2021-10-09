import React from "react";

import Icon from "../../common/Icon/Icon";
import Modal from "../../common/Modal/Modal";

import { useModal } from "../../common/Modal/ModalContext";
import { MODAL_COMMENT_ID } from "../../../utils/constants/modals";

const CommentModal = () => {
  const [modalID, setModalID] = useModal();

  if (modalID !== MODAL_COMMENT_ID) {
    return <></>;
  }

  return (
    <Modal modifier="wide">
      <h2 className="modal__header">Комментарий</h2>
      <div className="modal__info-wrapper">
        <div className="modal__description">
          <textarea className="modal__editable-text modal__editable-text--wide">
            Этот сценарий покажет что-то, чего вы не умеете хаха!!!!!! АААААА
            Режим тестирования станет доступен после обычного прохождения.
          </textarea>
        </div>
      </div>
      <div className="modal__upload-wrapper">
        <button className="button modal__button" type="button">
          <Icon id="image" width="22" />
          Добавить фото
        </button>
        <button
          className="button modal__button modal__button--icon-only"
          type="button"
        >
          <Icon id="cancel" width="24" />
        </button>
      </div>
      <div className="modal__button-wrapper">
        <button className="button button--accept" type="button">
          <Icon id="accept" width="22" />
          Готово
        </button>
        <button
          className="button button--discard"
          type="button"
          onClick={() => setModalID()}
        >
          <Icon id="cancel" width="22" />
          Отменить
        </button>
      </div>
    </Modal>
  );
};

export default CommentModal;
