import React, { useState } from "react";

import "../../Dropdown/Dropdown.scss";

const options = ["ЛКМ", "Ввод текст", "ПКМ"];

// NOT FINISHED, FEEL FREE TO CHANGE
const ActionPicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("ЛКМ");

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  return (
    <div className="dropdown__wrapper dropdown__wrapper--action">
      <ul className="dropdown__list">
        {options.map((option, i) => (
          <li
            className={
              selectedOption === option
                ? "dropdown__item dropdown__item--current"
                : "dropdown__item"
            }
            onClick={onOptionClicked(option)}
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
