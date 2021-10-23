import React, { useEffect } from "react";
import Icon from "../../common/Icon/Icon";
import { observer } from "mobx-react-lite";
import "./ZoomPanel.scss";

const ZoomPanel = observer(
  ({ data, maskMode, onApply, onCancel, onRepeatMasks }) => {
    const repeatMaskDisabled = () => {
      if (data.currentStepNumber > 1) {
        const repeatableMasks = data.currentStepData.masks.filter((mask) => {
          return (
            data.steps[data.currentStepNumber - 1].masks.findIndex(
              (prevStepMask) => {
                return prevStepMask.id === mask.id;
              }
            ) !== -1
          );
        });
        return (
          repeatableMasks.length ===
          data.steps[data.currentStepNumber - 1].masks.length
        );
      }
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
        <button className="button button--accept" onClick={() => onApply()}>
          <Icon id="accept" width="22" />
          Готово
        </button>
        <button className="button button--discard" onClick={() => onCancel()}>
          <Icon id="cancel" width="22" />
          Отменить
        </button>
      </div>
    );
  }
);

export default ZoomPanel;
