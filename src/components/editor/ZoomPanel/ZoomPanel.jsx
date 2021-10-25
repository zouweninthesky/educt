import React, { useEffect } from "react";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import "./ZoomPanel.scss";

import Icon from "../../common/Icon/Icon";

import EditorStore from "../../../store/editor";

const ZoomPanel = observer(({ maskMode, onApply, onCancel, onRepeatMasks }) => {
  const repeatMaskDisabled = () => {
    let repeatableMasks;
    if (EditorStore.currentStepNumber > 0) {
      repeatableMasks = EditorStore.currentStepData.masks.filter(
        (mask) => {
          return (
            EditorStore.steps[
            EditorStore.currentStepNumber - 1
              ].masks.findIndex((prevStepMask) => {
              return prevStepMask.id === mask.id;
            }) !== -1
          );
        }
      );
      // console.log(repeatableMasks);
    }
    // console.log(toJS(repeatableMasks), EditorStore.currentStepNumber);
    return (
      repeatableMasks?.length ===
      EditorStore.steps[EditorStore.currentStepNumber - 1]?.masks.length || EditorStore.currentStepNumber <= 0);
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
          EditorStore.hideActionPicker();
          onApply();
        }}
      >
        <Icon id="accept" width="22" />
        Готово
      </button>
      <button
        className="button button--discard"
        onClick={() => {
          EditorStore.hideActionPicker();
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
