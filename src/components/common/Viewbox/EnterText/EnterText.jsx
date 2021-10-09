import React, { useState } from "react";

import Icon from "../../Icon/Icon";

import {
  MOUSE_LEFT_BUTTON,
  KEYBOARD_ENTER_BUTTON,
} from "../../../../utils/constants/keycodes";

const EnterText = ({ step, actionClick }) => {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);

  const neededString = step.metaInfo.text.slice();

  const hint = () => {
    if (neededString === "") {
      return (
        <button
          className="viewbox__action-type viewbox__action-type--clickable"
          type="button"
          onClick={(e) => {
            if (e.button === MOUSE_LEFT_BUTTON) {
              actionClick();
            }
          }}
        >
          <Icon id="accept" width="42" height="42" />
        </button>
      );
    }

    if (value === "") {
      return (
        <span className="viewbox__action-type">
          <Icon id="text" width="42" height="42" />
        </span>
      );
    }

    return isValid ? (
      <button
        className="viewbox__action-type viewbox__action-type--clickable"
        type="button"
        onClick={(e) => {
          if (e.button === MOUSE_LEFT_BUTTON) {
            actionClick();
          }
        }}
      >
        <Icon id="accept" width="42" height="42" />
      </button>
    ) : (
      <span className="viewbox__action-type">
        <Icon id="cancel" width="42" height="42" />
      </span>
    );
  };

  return (
    <>
      <textarea
        name="temp-name"
        className="viewbox__action-button"
        placeholder={neededString}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (e.target.value === neededString) setIsValid(true);
          else setIsValid(false);
        }}
        onKeyDown={(e) => {
          if (isValid) {
            if (e.key === KEYBOARD_ENTER_BUTTON) {
              actionClick();
            }
          }
        }}
      ></textarea>
      {hint()}
    </>
  );
};

export default EnterText;
