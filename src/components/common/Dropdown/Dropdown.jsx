import React, { useState } from "react";

import Icon from "../Icon/Icon";
import "./Dropdown.scss";

const options = ["Все сценарии", "Новое", "Тестирование"];

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Новое");

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <Icon id="angle-down" width="24" className="dropdown__arrow" />
      <div className="dropdown__header" onClick={toggling}>
        {selectedOption}
      </div>
      {isOpen && (
        <div className="dropdown__wrapper">
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
      )}
    </div>
  );
};

export default Dropdown;
