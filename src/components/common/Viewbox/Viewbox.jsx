import React from "react";

// import TempStep from "../../../static/img/test/test.jpg";
import Icon from "../Icon/Icon";
import {
  MOUSE_LEFT_BUTTON,
  MOUSE_RIGHT_BUTTON,
} from "../../../utils/constants/keycodes";
import { STORAGE_URL } from "../../../utils/constants/links";
import "./Viewbox.scss";

const Viewbox = ({ mod, step, actionClick }) => {
  const mainClass = mod ? `viewbox viewbox--${mod}` : "viewbox";

  const { boxCoords } = step.metaInfo;

  const imageLink = `${STORAGE_URL}${step.imageUID}`;

  const actionStyle = {
    top: boxCoords.upperLeft.y,
    left: boxCoords.upperLeft.x,
    width: boxCoords.width,
    height: boxCoords.height,
  };

  const actionButton = () => {
    switch (step.actionID) {
      case 1:
        return (
          <>
            <button
              className="viewbox__action"
              type="button"
              onClick={(e) => {
                if (e.button === MOUSE_LEFT_BUTTON) {
                  actionClick();
                }
              }}
            ></button>
            <span className="viewbox__action-type">
              <Icon id="mouse-left" width="42" height="42" />
            </span>
          </>
        );
      case 2:
        return (
          <>
            {/* need more work */}
            <textarea
              name="temp-name"
              className="viewbox__action"
              style={actionStyle}
            ></textarea>
            <span className="viewbox__action-type">
              <Icon id="text" width="42" height="42" />
            </span>
          </>
        );
      case 3:
        return (
          <>
            <button
              className="viewbox__action"
              type="button"
              style={actionStyle}
              onClick={(e) => {
                if (e.button === MOUSE_RIGHT_BUTTON) {
                  actionClick();
                }
              }}
            ></button>
            <span className="viewbox__action-type">
              <Icon id="mouse-right" width="42" height="42" />
            </span>
          </>
        );
      default:
    }
  };

  return (
    <section className={mainClass}>
      <h2 className="visually-hidden">Текущий слайд</h2>
      <div className="viewbox__wrapper">
        <img className="viewbox__image" alt="Текущий слайд" src={imageLink} />
        <div className="viewbox__action-wrapper" style={actionStyle}>
          {actionButton()}
        </div>
        {/* <div className="viewbox__mask">
          <button
            type="button"
            className="viewbox__mask-remove button button--icon-only"
          >
            <Icon id="cancel" width="22" />
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default Viewbox;
