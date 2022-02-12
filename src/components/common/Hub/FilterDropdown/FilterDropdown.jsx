import React, { useState } from "react";
import "../../Dropdown/Dropdown.scss";

import Icon from "../../Icon/Icon";

import ScriptsStore from "../../../../store/scripts";
import { observer } from "mobx-react-lite";

const FilterDropdown = observer(({ isEditor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { filterOptions, stateFilterID } = ScriptsStore;

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (id) => () => {
    const [option] = filterOptions.filter((opt) => opt.id === id);
    ScriptsStore.applyStateFilter(id);
    setIsOpen(false);
  };

  return (
    <div className="dropdown" onClick={toggling}>
      <Icon id="angle-down" width="24" className="dropdown__arrow" />
      <div className="dropdown__header">
        {filterOptions[stateFilterID].title}
      </div>
      {isOpen && (
        <div className="dropdown__wrapper">
          <ul className="dropdown__list">
            {filterOptions.map((option, i) => {
              if (!isEditor && option.id === 3) return <></>;
              return (
                <li
                  className={
                    filterOptions[stateFilterID].id === option.id
                      ? "dropdown__item dropdown__item--current"
                      : "dropdown__item"
                  }
                  onClick={onOptionClicked(option.id)}
                  key={option.id}
                >
                  {option.title}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
});

export default FilterDropdown;
