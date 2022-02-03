import React from "react";
import "../../Dropdown/Dropdown.scss";

import EditorStepStore from "../../../../store/editorStep";

const options = ["ЛКМ", "Ввод текста", "ПКМ"];

const ActionPicker = ({ pickerStyle }) => {
  return (
    <div
      className="dropdown__wrapper dropdown__wrapper--action"
      style={pickerStyle}
    >
      <ul className="dropdown__list">
        {options.map((option, i) => (
          <li
            className={
              EditorStepStore.currentStepData.actionID === i + 1
                ? "dropdown__item dropdown__item--current"
                : "dropdown__item"
            }
            onClick={() => {
              EditorStepStore.setActionType(i + 1);
              EditorStepStore.hideActionPicker();
            }}
            key={i}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActionPicker;
