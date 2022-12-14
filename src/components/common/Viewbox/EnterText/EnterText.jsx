import React, { useState, useEffect, useRef } from "react";

import Icon from "../../Icon/Icon";

import ExamStore from "../../../../store/exam";
// import EditorStore from "../../../../store/editor";
import EditorStepStore from "../../../../store/editorStep";
import { useModal } from "../../Modal/ModalContext";
import {
  MOUSE_LEFT_BUTTON,
  KEYBOARD_ENTER_BUTTON,
} from "../../../../utils/constants/keycodes";

const EnterText = ({ actionClick, step, isEditor, sizes, isExam }) => {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const inputField = useRef(null);
  const [modalID] = useModal();

  const neededString = isEditor
    ? EditorStepStore.currentStepData.metaInfo.text?.slice() || ""
    : step.metaInfo.text?.slice() || "";

  useEffect(() => {
    if (!isEditor && modalID === null) {
      inputField.current.focus();
    }
    if (modalID !== null) {
      inputField.current.blur();
    }
  });

  const hint = () => {
    if (isEditor) {
      return (
        <span
          className="viewbox__action-type"
          onClick={() => EditorStepStore.toggleActionPickerVisible()}
        >
          <Icon id="text" width="42" />
        </span>
      );
    }

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
          <Icon id="accept" width="42" />
        </button>
      );
    }

    if (value === "") {
      return (
        <span className="viewbox__action-type">
          <Icon id="text" width="42" />
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
        <Icon id="accept" width="42" />
      </button>
    ) : (
      <span className="viewbox__action-type">
        <Icon id="cancel" width="42" />
      </span>
    );
  };

  const onChange = (e) => {
    if (isEditor) {
      setValue(e.target.value);
      EditorStepStore.currentStepData.metaInfo.text = e.target.value;
    } else if (isExam) {
      setValue(e.target.value);
      ExamStore.symbolTyped();
      if (e.target.value === neededString) setIsValid(true);
      else setIsValid(false);
    } else {
      setValue(e.target.value);
      if (e.target.value === neededString) setIsValid(true);
      else setIsValid(false);
    }
  };

  return (
    <>
      <textarea
        name="temp-name"
        className="viewbox__action-button"
        placeholder={isExam ? "" : neededString}
        value={value}
        style={sizes}
        ref={inputField}
        onChange={(e) => {
          onChange(e);
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
