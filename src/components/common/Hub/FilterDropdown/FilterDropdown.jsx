import React, { useState } from "react";
import "../../Dropdown/Dropdown.scss";

import Icon from "../../Icon/Icon";

import ScriptsStore from "../../../../store/scripts";

const FilterDropdown = () => {
  const options = [
    { id: 1, title: "Все сценарии", state: null },
    { id: 2, title: "Новое", state: 1 },
    { id: 3, title: "На тестирование", state: 2 },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (id) => () => {
    const [option] = options.filter((opt) => opt.id === id);
    setSelectedOption(option);
    ScriptsStore.applyStateFilter(option.state);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <Icon id="angle-down" width="24" className="dropdown__arrow" />
      <div className="dropdown__header" onClick={toggling}>
        {selectedOption.title}
      </div>
      {isOpen && (
        <div className="dropdown__wrapper">
          <ul className="dropdown__list">
            {options.map((option, i) => (
              <li
                className={
                  selectedOption.id === option.id
                    ? "dropdown__item dropdown__item--current"
                    : "dropdown__item"
                }
                onClick={onOptionClicked(option.id)}
                key={option.id}
              >
                {option.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
