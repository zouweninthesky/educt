import React from "react";
import "./Tools.scss";

import Icon from "../../common/Icon/Icon";

import EditorStore from "../../../store/editor";
import { useModal } from "../../common/Modal/ModalContext";
import {
  MODAL_DELETE_STEP_ID,
  MODAL_COMMENT_ID,
} from "../../../utils/constants/modals";
import { observer } from "mobx-react-lite";

const Tools = observer(() => {
  const [, setModalID] = useModal();

  const { steps, currentStepNumber } = EditorStore;

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
        onClick={() => EditorStore.prevStep()}
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
        onClick={() => EditorStore.nextStep()}
      >
        <Icon id="angle-right" width="24" />
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
              <span>{EditorStore.currentStepNumber + 1}</span>
              <span>из {EditorStore.steps.length}</span>
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
            onClick={() => EditorStore.setActionMode()}
          >
            <Icon id="action" width="64" />
            <h3 className="tools__button-title">Действие</h3>
          </button>
        </li>
        <li className="tools__button-item">
          <button className="tools__button" type="button">
            <Icon id="microphone" width="64" />
            <h3 className="tools__button-title">Аудио</h3>
          </button>
        </li>
        <li className="tools__button-item">
          <button
            className="tools__button"
            type="button"
            disabled
            onClick={() => EditorStore.setMaskMode()}
          >
            <Icon id="layer-group" width="64" />
            <h3 className="tools__button-title">Маска</h3>
          </button>
        </li>
        <li className="tools__button-item">
          <button
            className="tools__button"
            type="button"
            disabled={EditorStore.steps.length <= 1}
            onClick={() =>
              EditorStore.steps.length > 1
                ? setModalID(MODAL_DELETE_STEP_ID)
                : null
            }
          >
            <Icon id="trash" width="64" />
            <h3 className="tools__button-title">Удалить слайд</h3>
          </button>
        </li>
      </ul>
    </div>
  );
});

export default Tools;
