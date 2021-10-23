import React, { useEffect } from "react";
import Icon from "../../../common/Icon/Icon";
import { observer } from "mobx-react-lite";

const ApplyCancel = observer(({ data, maskMode, actionMode, steps, currentStep, currentStepNumber, onApply, onCancel, onRepeatMasks }) => {

  const repeatMaskDisabled = () => {
    if (data.currentStepNumber > 1) {
      const repeatableMasks = data.currentStepData.masks.filter((mask) => {
        return data.steps[data.currentStepNumber - 1].masks.findIndex((prevStepMask) => {
          return prevStepMask.id === mask.id;
        }) !== -1;
      });
      return (repeatableMasks.length === data.steps[data.currentStepNumber - 1].masks.length);
    }
  };

  const RepeatMask = (disabled) => {
    return <button className='apply-cancel__repeat-mask' onClick={onRepeatMasks} disabled={disabled}>
      <Icon id='mask' width='1.125rem' />
      Повторить маску
    </button>;
  };


  return (
    <div className='apply-cancel'>
      {maskMode ? RepeatMask(repeatMaskDisabled()) : null}
      <button className='apply-cancel__apply' onClick={() => onApply()}>
        <Icon id='apply' width='0.75rem' />
        Готово
      </button>
      <button className='apply-cancel__apply' onClick={() => onCancel()}>
        <Icon id='close' width='0.75rem' />
        Отменить
      </button>
    </div>
  );
});

export default ApplyCancel;