import React from "react";
import "./Tools.scss";

import Icon from "../../common/Icon/Icon";

import { useModal } from "../../common/Modal/ModalContext";
import {
  MODAL_DELETE_STEP_ID,
  MODAL_COMMENT_ID
} from "../../../utils/constants/modals";
import { observer } from "mobx-react-lite";

const Tools = observer(({ data }) => {
  const [, setModalID] = useModal();

  return (
    <div className="tools">
      <ul className="tools__buttons-list">
        <li className="tools__button-item">
          <div className="tools__buttons-wrapper">
            <button className="tools__navigation-button" type="button" onClick={() => data.prevStep()}>
              <Icon id="angle-left" width="24" />
            </button>
            <p className="tools__navigation-count">
              <span>{data.currentStepNumber + 1}</span>
              <span>из {data.steps.length}</span>
            </p>
            <button className="tools__navigation-button" type="button" onClick={() => data.nextStep()}>
              <Icon id="angle-right" width="24" />
            </button>
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
          <button className="tools__button" type="button" onClick={() => data.setActionMode()}>
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
          <button className="tools__button" type="button" onClick={() => data.setMaskMode()}>
            <Icon id="layer-group" width="64" />
            <h3 className="tools__button-title">Маска</h3>
          </button>
        </li>
        <li className="tools__button-item">
          <button
            className="tools__button"
            type="button"
            disabled={data.steps.length <= 1}
            onClick={() => (data.steps.length > 1) ? setModalID(MODAL_DELETE_STEP_ID) : null}
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
