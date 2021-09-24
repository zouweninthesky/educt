import React from "react";

import Icon from "../../common/Icon/Icon";
import Modal from "../../common/Modal/Modal";
import { useModal } from "../../common/Modal/ModalContext";

const SettingsModal = () => {
  const [modalID, setModalID] = useModal();

  if (modalID !== "settings") {
    return <></>;
  }

  return (
    <Modal modifier="wide">
      <input
        className="modal__header modal__editable-text modal__editable-text--wide modal__editable-text--header"
        value="Выгрузка табеля учета рабочего времени"
      />
      <div className="modal__info-wrapper">
        <div className="modal__description">
          <textarea className="modal__editable-text">
            Этот сценарий покажет что-то, чего вы не умеете хаха!!!!!! АААААА
            Режим тестирования станет доступен после обычного прохождения.
          </textarea>
        </div>
        <div className="modal__info">
          <p>5 слайдов</p>
          <p>&gt; 1 минуты</p>
        </div>
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

export default SettingsModal;
