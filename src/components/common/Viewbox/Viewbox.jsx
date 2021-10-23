import React, { useRef, useState, useEffect } from "react";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import "./Viewbox.scss";

import Icon from "../Icon/Icon";
import ActionPicker from "./ActionPicker/ActionPicker";
import EnterText from "./EnterText/EnterText";
import Mask from "../../editor/mask/Mask";

import { MOUSE_LEFT_BUTTON } from "../../../utils/constants/keycodes";
import { STORAGE_URL } from "../../../utils/constants/links";
import DeleteMaskButton from "../../editor/mask/deleteMaskButton/DeleteMaskButton";
import { calculateTopLeft, calculateWidth, calculateHeight } from "../../../utils/calculateMaskCoords";
// import TempStep from "../../../static/img/test/test.jpg";

const MARGIN_FOR_ACTION = 70;

const Viewbox = observer(({ data, mod, actionClick, onNewMask, onDeleteMask, onShrinkRatioChange }) => {

    const image = useRef(null);

    const [shrinkRatio, setShrinkRatio] = useState(
      image.complete ? image.current.clientWidth / image.current.naturalWidth : 1
    );

    useEffect(() => {
      onShrinkRatioChange(shrinkRatio);
    }, [shrinkRatio]);

    const [actionClass, setActionClass] = useState(
      image.complete
        ? actionStyle().width + actionStyle().left + MARGIN_FOR_ACTION >=
        image.current.clientWidth
        ? "viewbox__action--left"
        : ""
        : ""
    );

    const [imageOffsets, setImageOffsets] = useState({ x: 0, y: 0 });
    const [currentObjFirst, setCurrentObjFirst] = useState(undefined);
    const [currentObjSecond, setCurrentObjSecond] = useState(undefined);
    const [creatingObj, setCreatingObj] = useState(false);

    useEffect(() => {
      if (data.mode === "mask") {
        if (!creatingObj && currentObjFirst?.x && currentObjSecond?.x) {
          onNewMask(currentObjFirst, currentObjSecond);
          setCurrentObjFirst(undefined);
          setCurrentObjSecond(undefined);
        }
      } else if (data.mode === "action") {
        if (!creatingObj && currentObjFirst?.x && currentObjSecond?.x) {
          data.updateAction({
            x: (currentObjFirst.x + 4) / shrinkRatio,
            y: (currentObjFirst.y + 4) / shrinkRatio
          }, {
            x: (currentObjSecond.x + 4) / shrinkRatio,
            y: (currentObjSecond.y + 4) / shrinkRatio
          });
          setCurrentObjFirst(undefined);
          setCurrentObjSecond(undefined);
          if (data.mode === "action") data.actionPickerVisible = true;
        }
      }
    }, [currentObjSecond, creatingObj]);

    useEffect(() => {
      // setting image offsets
      if (image.current.complete) {
        setImageOffsets({ x: image.current.getBoundingClientRect().left, y: image.current.getBoundingClientRect().top });
      } else {
        image.current.onload = () => {
          setImageOffsets({
            x: image.current.getBoundingClientRect().left,
            y: image.current.getBoundingClientRect().top
          });
        };
      }
    }, [data.currentStepData]);

    const vbMainClass = mod ? `viewbox viewbox--${mod}` : "viewbox";
    const vbCursorClass = (data.mode === "mask" || data.mode === "action") ? " viewbox--crosshair" : "";
    const vbActionClass = data.mode === "action" ? " viewbox--action-mode" : "";
    const maskActions = (data.mode === "mask" || data.mode === "action") ? {
      onMouseDown: (e) => {
        if (e.target === e.currentTarget) {
          if (data.actionPickerVisible) data.actionPickerVisible = false;
          else {
            setCreatingObj(true);
            setCurrentObjFirst({ x: e.clientX - imageOffsets.x, y: e.clientY - imageOffsets.y });
            if (data.mode === "action") data.actionPickerVisible = false;
          }
        }
      },
      onMouseUp: (e) => {
        if (e.target === e.currentTarget) {
          if (creatingObj) {
            setCurrentObjSecond({ x: e.clientX - imageOffsets.x, y: e.clientY - imageOffsets.y });
            if (data.mode === "action") data.actionPickerVisible = true;
          }
          setCreatingObj(false);
        }
      },
      onMouseMove: (e) => {
        if (e.target === e.currentTarget) {
          if (creatingObj) {
            setCurrentObjSecond({ x: e.clientX - imageOffsets.x, y: e.clientY - imageOffsets.y });
          }
        }
      },
      onMouseOut: (e) => {
        if (e.target === e.currentTarget) {
          if (creatingObj) {
            setCreatingObj(false);
            if (data.mode === "action") data.actionPickerVisible = true;
          }
        }
      }
    } : {};

    const imageLink = `${STORAGE_URL}${data.currentStepData.imageUID}`;

    const { boxCoords } = data.currentStepData.metaInfo;

    const getShrinkRatioActionClass = () => {
      setShrinkRatio(image.current.clientWidth / image.current.naturalWidth);
      setActionClass(
        actionStyle().width + actionStyle().left + MARGIN_FOR_ACTION >=
        image.current.clientWidth
          ? "viewbox__action--left"
          : ""
      );
    };

    const actionStyle = () => {
      const defaultStyle = {
        top: boxCoords.upperLeft.y * shrinkRatio - 4,
        left: boxCoords.upperLeft.x * shrinkRatio - 4
      };
      console.log(currentObjFirst, currentObjSecond);
      if (data.mode === "action" && currentObjFirst && currentObjSecond) return ({
        top: calculateTopLeft(currentObjFirst, currentObjSecond)?.y,
        left: calculateTopLeft(currentObjFirst, currentObjSecond)?.x
      });
      return defaultStyle;
    };

    const actionButtonStyle = () => {
      const defaultStyle = {
        width: boxCoords.width * shrinkRatio,
        height: boxCoords.height * shrinkRatio
      };
      console.log(currentObjFirst, currentObjSecond);
      if (data.mode === "action" && currentObjFirst && currentObjSecond) return ({
        width: calculateWidth(currentObjFirst, currentObjSecond),
        height: calculateHeight(currentObjFirst, currentObjSecond)
      });
      return defaultStyle;
    };

    const actionButton = () => {
      switch (data.currentStepData.actionID) {
        case 1:
          return (
            <>
              <button
                className="viewbox__action-button"
                type="button"
                style={actionButtonStyle()}
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
            <EnterText
              data={data}
              actionClick={actionClick}
              sizes={actionButtonStyle()}
            />
          );
        case 3:
          return (
            <>
              <button
                className="viewbox__action-button"
                type="button"
                style={actionButtonStyle()}
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

    const Masks = () => {
      const masks = data.currentStepData.masks.map((el) => {
        return <Mask firstPoint={el.topLeft} secondPoint={el.bottomRight} key={el.id} />;
      });
      if (data.mode === "mask" && currentObjFirst?.x && currentObjSecond?.x) masks.push(<Mask firstPoint={currentObjFirst}
                                                                                              secondPoint={currentObjSecond}
                                                                                              key="current" />);
      return masks;
    };

    const DeleteMasksButtons = () => {
      const buttons = data.currentStepData.masks.map((el) => {
        return <DeleteMaskButton firstPoint={el.topLeft} secondPoint={el.bottomRight}
                                 onDeleteMask={() => onDeleteMask(el.id)} key={el.id} />;
      });
      return buttons;
    };

    const actionPickerStyle = () => {
      return {
        top: actionStyle().top,
        left: `calc(${actionStyle().left + actionButtonStyle().width + 8 + 2 + 6}px + 3.125rem)`
      };
    };

    return (
      <section className={vbMainClass + vbCursorClass + vbActionClass}>
        <h2 className="visually-hidden">Текущий слайд</h2>
        <div className="viewbox__wrapper">
          <div className="viewbox__canvas" {...maskActions}>
            {DeleteMasksButtons()}
            {data.actionPickerVisible ? <ActionPicker data={data} pickerStyle={actionPickerStyle()} /> : null}
          </div>
          {Masks()}
          <div className={`viewbox__action ${actionClass}`} style={actionStyle()}>
            {actionButton()}
          </div>
          <img
            className="viewbox__image"
            alt="Текущий слайд"
            src={imageLink}
            ref={image}
            onLoad={() => {
              getShrinkRatioActionClass();
            }}
          />
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
  })
;

export default Viewbox;
