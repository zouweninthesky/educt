import React from "react";
import { observer } from "mobx-react-lite";
import "./ZoomPanel.scss";

import Icon from "../../common/Icon/Icon";

import EditorStepStore from "../../../store/editorStep";
import EditorMaskStore from "../../../store/editorMask";

const ZoomPanel = observer(({ maskMode, onApply, onCancel, onRepeatMasks }) => {
  const repeatMaskDisabled = () => {
    if (EditorStepStore.currentStepNumber > 0) {
      const prevStepMaskObject = EditorMaskStore.toMask.find(
        (obj) =>
          obj.UID ===
          EditorStepStore.steps[EditorStepStore.currentStepNumber - 1].UID
      );
      if (prevStepMaskObject) {
        return !(
          EditorMaskStore.currentMasks.length === 0 && prevStepMaskObject
        );
      }
      return true;
    }
    return true;
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
