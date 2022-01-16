import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react-lite";

import Icon from "../../common/Icon/Icon";
import Modal from "../../common/Modal/Modal";

import EditorImagesStore from "../../../store/editorImages";
import EditorStepStore from "../../../store/editorStep";
import { useModal } from "../../common/Modal/ModalContext";
import { MODAL_COMMENT_ID } from "../../../utils/constants/modals";

const CommentModal = observer(({ step }) => {
  const [modalID, setModalID] = useModal();

  const [value, setValue] = useState(step);

  const fileInput = useRef(null);

  useEffect(() => {
    if (value !== step) {
      setValue(step);
    }
  }, [step]);

  if (modalID !== MODAL_COMMENT_ID) {
    return <></>;
  }

  const buttons = () => {
    const index = EditorImagesStore.commentImages.findIndex(
      (obj) => obj.stepUID === EditorStepStore.currentStepData.UID
    );
    if (index === -1) {
      return (
        <button
          className="button modal__button"
          type="button"
          onClick={() => fileInput.current.click()}
        >
          <Icon id="image" width="22" />
          Добавить фото
        </button>
      );
    }
    return (
      <>
        <p className="modal__upload-name">
          {EditorImagesStore.commentImages[index].name}
        </p>
        <button
          className="button modal__button modal__button--icon-only"
          type="button"
          onClick={() => {
            EditorImagesStore.removeCommentImage();
          }}
        >
          <Icon id="cancel" width="24" />
        </button>
      </>
    );
  };

  return (
    <Modal modifier="wide">
      <h2 className="modal__header">Комментарий</h2>
      <div className="modal__info-wrapper">
        <div className="modal__description">
          <textarea
            className="modal__editable-text modal__editable-text--wide"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          ></textarea>
        </div>
      </div>
      <div className="modal__upload-wrapper">
        {buttons()}
        <input
          type="file"
          name=""
          id=""
          ref={fileInput}
          accept="image/*"
          className="modal__upload-button"
          onChange={async (e) => {
            e.preventDefault();
            const reader = new FileReader();
            console.log(e.target.files[0]);
            reader.readAsArrayBuffer(e.target.files[0]);
            reader.onload = () => {
              console.log(reader.result);
              EditorImagesStore.addCommentImage(
                reader.result,
                e.target.files[0].name
              );
              EditorStepStore.saveStepDescriptionImage();
            };
          }}
        />
      </div>
      <div className="modal__button-wrapper">
        <button
          className="button button--accept"
          type="button"
          onClick={() => {
            EditorStepStore.saveStepDescription(value);
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
            EditorImagesStore.removeCommentImage();
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

export default CommentModal;
