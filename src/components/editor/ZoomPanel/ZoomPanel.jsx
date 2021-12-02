import React, { useEffect } from "react";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import "./ZoomPanel.scss";

import Icon from "../../common/Icon/Icon";

import EditorStepStore from "../../../store/editorStep";

const ZoomPanel = observer(({ maskMode, onApply, onCancel, onRepeatMasks }) => {
  const repeatMaskDisabled = () => {
    return !(
      EditorStepStore.currentStepData.masks.length === 0 &&
      EditorStepStore.steps[EditorStepStore.currentStepNumber - 1]?.masks
        .length > 0 &&
      EditorStepStore.currentStepNumber > 0
    );
  };

  const RepeatMask = (disabled) => {
    return (
      <button
        className="zoom-panel__repeat-mask button button--simple"
        onClick={onRepeatMasks}
        disabled={disabled}
      >
        <Icon id="layer-group" width="22" />
        Повторить маску
      </button>
    );
  };

  return (
    <div className="zoom-panel">
      {maskMode ? RepeatMask(repeatMaskDisabled()) : null}
      <button
        className="button button--accept"
        onClick={() => {
          EditorStepStore.hideActionPicker();
          onApply();
        }}
      >
        <Icon id="accept" width="22" />
        Готово
      </button>
      <button
        className="button button--discard"
        onClick={() => {
          EditorStepStore.hideActionPicker();
          onCancel();
        }}
      >
        <Icon id="cancel" width="22" />
        Отменить
      </button>
    </div>
  );
});

export default ZoomPanel;
