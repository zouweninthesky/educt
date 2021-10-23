import React, { useState } from "react";
import "../../Dropdown/Dropdown.scss";

const options = ["ЛКМ", "Ввод текст", "ПКМ"];

// NOT FINISHED, FEEL FREE TO CHANGE
const ActionPicker = ({ data, pickerStyle }) => {
  // const [isOpen, setIsOpen] = useState(false);
  // const [selectedOption, setSelectedOption] = useState("ЛКМ");

  // const toggling = () => setIsOpen(!isOpen);
  //
  // const onOptionClicked = (value) => () => {
  //   setSelectedOption(value);
  //   setIsOpen(false);
  // };

  return (
    <div className="dropdown__wrapper dropdown__wrapper--action" style={pickerStyle}>
      <ul className="dropdown__list">
        {options.map((option, i) => (
          <li
            className={
              data.currentStepData.actionID === i + 1
                ? "dropdown__item dropdown__item--current"
                : "dropdown__item"
            }
            onClick={() => data.setActionType(i + 1)}
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
