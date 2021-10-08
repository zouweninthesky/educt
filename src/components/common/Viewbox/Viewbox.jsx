import React, { useRef, useState } from "react";

// import TempStep from "../../../static/img/test/test.jpg";
import Icon from "../Icon/Icon";
import { MOUSE_LEFT_BUTTON } from "../../../utils/constants/keycodes";
import { STORAGE_URL } from "../../../utils/constants/links";
import ActionPicker from "./ActionPicker/ActionPicker";
import "./Viewbox.scss";
import EnterText from "./EnterText/EnterText";

const Viewbox = ({ mod, step, actionClick }) => {
  const image = useRef(null);

  const [shrinkRatio, setShrinkRatio] = useState(
    image.complete ? image.current.clientWidth / image.current.naturalWidth : 1
  );

  const mainClass = mod ? `viewbox viewbox--${mod}` : "viewbox";

  const imageLink = `${STORAGE_URL}${step.imageUID}`;

  const { boxCoords } = step.metaInfo;

  const getShrinkRatio = () => {
    setShrinkRatio(image.current.clientWidth / image.current.naturalWidth);
  };

  const actionStyle = {
    top: boxCoords.upperLeft.y * shrinkRatio,
    left: boxCoords.upperLeft.x * shrinkRatio,
    width: boxCoords.width * shrinkRatio,
    height: boxCoords.height * shrinkRatio,
  };

  const actionButton = () => {
    switch (step.actionID) {
      case 1:
        return (
          <>
            <button
              className="viewbox__action-button"
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
        return <EnterText step={step} actionClick={actionClick} />;
      case 3:
        return (
          <>
            <button
              className="viewbox__action-button"
              type="button"
              onContextMenu={(e) => {
                e.preventDefault();
                actionClick();
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
        <img
          className="viewbox__image"
          alt="Текущий слайд"
          src={imageLink}
          ref={image}
          onLoad={() => {
            getShrinkRatio();
          }}
        />
        <div className="viewbox__action" style={actionStyle}>
          {actionButton()}
          {/* <ActionPicker /> */}
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
