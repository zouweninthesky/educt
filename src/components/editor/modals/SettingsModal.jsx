import React from "react";
import { observer } from "mobx-react-lite";

import Icon from "../../common/Icon/Icon";
import Modal from "../../common/Modal/Modal";

import EditorMainStore from "../../../store/editorMain";
import { useModal } from "../../common/Modal/ModalContext";
import { MODAL_SETTINGS_ID } from "../../../utils/constants/modals";

const SettingsModal = observer(() => {
  const [modalID, setModalID] = useModal();

  if (modalID !== MODAL_SETTINGS_ID) {
    return <></>;
  }

  const { scriptTitle, scriptDescription } = EditorMainStore;

  return (
    <Modal modifier="wide">
      <input
        className="modal__header modal__editable-text modal__editable-text--wide modal__editable-text--header"
        value={scriptTitle}
        onChange={(e) => {
          EditorMainStore.changeTitle(e.target.value);
        }}
      />
      <div className="modal__info-wrapper">
        <div className="modal__description">
          <textarea
            className="modal__editable-text"
            value={scriptDescription}
            onChange={(e) => {
              EditorMainStore.changeDescription(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="modal__info">
          <p>5 слайдов</p>
          <p>&gt; 1 минуты</p>
        </div>
      </div>
      <div className="modal__button-wrapper">
        <button
          className="button button--accept"
          type="button"
          onClick={() => {
            EditorMainStore.scriptTitleDescriptionUpdate();
            setModalID();
          }}
        >
          <Icon id="accept" width="22" />
          Готово
        </button>
        <button
          className="button button--discard"
          type="button"
          onClick={() => {
            EditorMainStore.resetTitleDescription();
            setModalID();
          }}
        >
          <Icon id="cancel" width="22" />
          Отменить
        </button>
      </div>
    </Modal>
  );
});

export default SettingsModal;
