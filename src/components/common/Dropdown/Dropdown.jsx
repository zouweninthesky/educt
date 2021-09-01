import React, { useState } from "react";

import sprite from "../../../assets/img/sprite.svg";

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
      <svg className="dropdown__arrow" width="24" height="24">
        <use href={sprite + "#icon-angle-down"}></use>
      </svg>
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
