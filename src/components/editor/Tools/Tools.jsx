import React from "react";
import "./Tools.scss";

import Icon from "../../common/Icon/Icon";

import EditorMainStore from "../../../store/editorMain";
import EditorStepStore from "../../../store/editorStep";
import { useModal } from "../../common/Modal/ModalContext";
import {
  MODAL_DELETE_STEP_ID,
  MODAL_DELETE_SCRIPT_ID,
  MODAL_COMMENT_ID,
} from "../../../utils/constants/modals";
import { observer } from "mobx-react-lite";

const Tools = observer(() => {
  const [, setModalID] = useModal();

  const { steps, currentStepNumber } = EditorStepStore;

  const prevButton = () => {
    if (currentStepNumber === 0) {
      return (
        <button className="tools__navigation-button" type="button" disabled>
          <Icon id="angle-left" width="24" />
        </button>
      );
    }

    return (
      <button
        className="tools__navigation-button"
        type="button"
        onClick={() => EditorStepStore.prevStep()}
      >
        <Icon id="angle-left" width="24" />
      </button>
    );
  };

  const nextButton = () => {
    if (steps.length === currentStepNumber + 1) {
      return (
        <button className="tools__navigation-button" type="button" disabled>
          <Icon id="angle-right" width="24" />
        </button>
      );
    }

    return (
      <button
        className="tools__navigation-button"
        type="button"
        onClick={() => EditorStepStore.nextStep()}
      >
        <Icon id="angle-right" width="24" />
      </button>
    );
  };

  const deleteButton = () => {
    const modalID =
      EditorStepStore.steps.length <= 1
        ? MODAL_DELETE_SCRIPT_ID
        : MODAL_DELETE_STEP_ID;

    return (
      <button
        className="tools__button"
        type="button"
        onClick={() => setModalID(modalID)}
      >
        <Icon id="trash" width="64" />
        <h3 className="tools__button-title">Удалить слайд</h3>
      </button>
    );
  };

  return (
    <div className="tools">
      <ul className="tools__buttons-list">
        <li className="tools__button-item">
          <div className="tools__buttons-wrapper">
            {prevButton()}
            <p className="tools__navigation-count">
              <span>{EditorStepStore.currentStepNumber + 1}</span>
              <span>из {EditorStepStore.steps.length}</span>
            </p>
            {nextButton()}
          </div>
        </li>
        <li className="tools__button-item">
          <button
            className="tools__button"
            type="button"
            onClick={() => setModalID(MODAL_COMMENT_ID)}
          >
            <Icon id="comment-new" width="64" />
            <h3 className="tools__button-title">Комментарий</h3>
          </button>
        </li>
        <li className="tools__button-item">
          <button
            className="tools__button"
            type="button"
            onClick={() => EditorMainStore.setActionMode()}
          >
            <Icon id="action" width="64" />
            <h3 className="tools__button-title">Действие</h3>
          </button>
        </li>
        <li className="tools__button-item">
          <button className="tools__button" type="button" disabled>
            <Icon id="microphone" width="64" />
            <h3 className="tools__button-title">Аудио</h3>
          </button>
        </li>
        <li className="tools__button-item">
          <button
            className="tools__button"
            type="button"
            // disabled
            onClick={() => EditorMainStore.setMaskMode()}
          >
            <Icon id="layer-group" width="64" />
            <h3 className="tools__button-title">Маска</h3>
          </button>
        </li>
        <li className="tools__button-item">{deleteButton()}</li>
      </ul>
    </div>
  );
});

export default Tools;
