import React, { useState } from "react";
import "../../Dropdown/Dropdown.scss";

import EditorStore from "../../../../store/editor";

const options = ["ЛКМ", "Ввод текста", "ПКМ"];

// NOT FINISHED, FEEL FREE TO CHANGE
const ActionPicker = ({ pickerStyle }) => {
  // const [isOpen, setIsOpen] = useState(false);
  // const [selectedOption, setSelectedOption] = useState("ЛКМ");

  // const toggling = () => setIsOpen(!isOpen);
  //
  // const onOptionClicked = (value) => () => {
  //   setSelectedOption(value);
  //   setIsOpen(false);
  // };

  return (
    <div
      className="dropdown__wrapper dropdown__wrapper--action"
      style={pickerStyle}
    >
      <ul className="dropdown__list">
        {options.map((option, i) => (
          <li
            className={
              EditorStore.currentStepData.actionID === i + 1
                ? "dropdown__item dropdown__item--current"
                : "dropdown__item"
            }
            onClick={() => EditorStore.setActionType(i + 1)}
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
