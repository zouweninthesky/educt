import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react-lite";

import Icon from "../../common/Icon/Icon";
import Modal from "../../common/Modal/Modal";

import EditorMainStore from "../../../store/editorMain";
import EditorStepStore from "../../../store/editorStep";
import UserScriptService from "../../../api/UserScriptService";
import { useModal } from "../../common/Modal/ModalContext";
import { MODAL_COMMENT_ID } from "../../../utils/constants/modals";

const CommentModal = observer(({ step }) => {
  const [modalID, setModalID] = useModal();

  const [value, setValue] = useState(step);
  const [image, setImage] = useState("");

  const fileInput = useRef(null);

  useEffect(() => {
    if (value !== step) {
      setValue(step);
    }
  }, [step]);

  // useEffect(() => {
  //   console.log(image);
  //   (async () => {
  //     const timeStamp = EditorMainStore.timeStamp;
  //     console.log(timeStamp);
  //     const fake = [{ imageUID: `${timeStamp}` }];
  //     console.log(fake);
  //     const links = await UserScriptService.getImageUpdateLinks(fake);
  //     console.log(links);
  //     await UserScriptService.replaceImagesStorage(image, links[0]);
  //   })();
  // }, [image]);

  if (modalID !== MODAL_COMMENT_ID) {
    return <></>;
  }

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
        <button
          className="button modal__button"
          type="button"
          onClick={() => fileInput.current.click()}
        >
          <Icon id="image" width="22" />
          Добавить фото
        </button>
        <input
          type="file"
          name=""
          id=""
          ref={fileInput}
          accept="image/*"
          className="modal__upload-button"
          onChange={async (e) => {
            e.preventDefault();
            const timeStamp = EditorMainStore.timeStamp;
            console.log(timeStamp);
            const reader = new FileReader();
            reader.readAsArrayBuffer(e.target.files[0]);
            reader.onload = async () => {
              await UserScriptService.uploadCommentImage(
                timeStamp,
                reader.result
              );
            };
          }}
        />

        <button
          className="button modal__button modal__button--icon-only"
          type="button"
        >
          <Icon id="cancel" width="24" />
        </button>
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
