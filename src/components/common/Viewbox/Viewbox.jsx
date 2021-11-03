import React, { useRef, useState, useEffect } from "react";
import "./Viewbox.scss";

import Icon from "../Icon/Icon";
import EnterText from "./EnterText/EnterText";
import Spinner from "../Spinner/Spinner";

import PlayerStore from "../../../store/player";
import { MOUSE_LEFT_BUTTON } from "../../../utils/constants/keycodes";
import { STORAGE_URL } from "../../../utils/constants/links";
import { observer } from "mobx-react-lite";
import Editor from "../../editor/Editor";

const MARGIN_FOR_ACTION = 70;

const Viewbox = observer(({ mod, step, actionClick }) => {
  const image = useRef(null);

  const { boxCoords } = step.metaInfo;

  const [shrinkRatio, setShrinkRatio] = useState(
    image.current && image.current.complete
      ? image.current.clientWidth / image.current.naturalWidth
      : 1
  );

  const actionStyle = {
    top: boxCoords.upperLeft.y * shrinkRatio - 4,
    left: boxCoords.upperLeft.x * shrinkRatio - 4,
    display: PlayerStore.imageLoaded ? "block" : "none",
  };

  const [actionClass, setActionClass] = useState(
    image.current && image.current.complete
      ? actionStyle.width + actionStyle.left + MARGIN_FOR_ACTION >=
        image.current.clientWidth
        ? "viewbox__action--left"
        : ""
      : ""
  );

  useEffect(() => {
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  });

  const mainClass = mod ? `viewbox viewbox--${mod}` : "viewbox";

  const imageLink = `${STORAGE_URL}${step.imageUID}?p=${PlayerStore.timeStamp}`;

  const getShrinkRatio = () => {
    setShrinkRatio(image.current.clientWidth / image.current.naturalWidth);
  };

  const onResize = () => {
    console.log(111111);
    if (
      image.current &&
      image.current.naturalWidth !== 0 &&
      image.current.complete
    ) {
      getShrinkRatio();
    }
  };

  const getShrinkRatioActionClass = () => {
    getShrinkRatio();
    setActionClass(
      actionStyle.width + actionStyle.left + MARGIN_FOR_ACTION >=
        image.current.clientWidth
        ? "viewbox__action--left"
        : ""
    );
  };

  const actionButtonStyle = {
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
              style={actionButtonStyle}
              onClick={(e) => {
                if (e.button === MOUSE_LEFT_BUTTON) {
                  actionClick();
                }
              }}
            ></button>
            <span className="viewbox__action-type">
              <Icon id="mouse-left" width="42" />
            </span>
          </>
        );
      case 2:
        return (
          <EnterText
            step={step}
            actionClick={actionClick}
            sizes={actionButtonStyle}
          />
        );
      case 3:
        return (
          <>
            <button
              className="viewbox__action-button"
              type="button"
              style={actionButtonStyle}
              onContextMenu={(e) => {
                e.preventDefault();
                actionClick();
              }}
            ></button>
            <span className="viewbox__action-type">
              <Icon id="mouse-right" width="42" />
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
        <Spinner show={!PlayerStore.imageLoaded} />
        <img
          className="viewbox__image"
          alt="Текущий слайд"
          src={imageLink}
          ref={image}
          onLoad={() => {
            PlayerStore.finishImageLoad();
            getShrinkRatioActionClass();
          }}
        />
        <div className={`viewbox__action ${actionClass}`} style={actionStyle}>
          {actionButton()}
        </div>
      </div>
    </section>
  );
});

export default Viewbox;
