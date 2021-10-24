import React, { useRef, useState, useEffect } from "react";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import "./Viewbox.scss";

import Icon from "../Icon/Icon";
import ActionPicker from "./ActionPicker/ActionPicker";
import EnterText from "./EnterText/EnterText";
import Mask from "../../editor/mask/Mask";

import EditorStore from "../../../store/editor";

import { STORAGE_URL } from "../../../utils/constants/links";
import DeleteMaskButton from "../../editor/mask/deleteMaskButton/DeleteMaskButton";
import {
  calculateTopLeft,
  calculateWidth,
  calculateHeight,
} from "../../../utils/calculateMaskCoords";

const MARGIN_FOR_ACTION = 70;

const Viewbox = observer(
  ({
    mod,
    actionClick,
    onNewMask,
    isEditor,
    onDeleteMask,
    onShrinkRatioChange,
  }) => {
    const image = useRef(null);

    const [shrinkRatio, setShrinkRatio] = useState(
      image.current && image.current.complete
        ? image.current.clientWidth / image.current.naturalWidth
        : 1
    );

    // diff
    useEffect(() => {
      onShrinkRatioChange(shrinkRatio);
    }, [shrinkRatio]);
    //

    useEffect(() => {
      return () => {
        window.removeEventListener("resize", onResize);
      };
    });

    const [actionClass, setActionClass] = useState(
      image.complete
        ? actionStyle().width + actionStyle().left + MARGIN_FOR_ACTION >=
          image.current.clientWidth
          ? "viewbox__action--left"
          : ""
        : ""
    );

    // diff
    const [imageOffsets, setImageOffsets] = useState({ x: 0, y: 0 });
    const [currentObjFirst, setCurrentObjFirst] = useState(undefined);
    const [currentObjSecond, setCurrentObjSecond] = useState(undefined);
    const [creatingObj, setCreatingObj] = useState(false);

    useEffect(() => {
      onResize();
    }, [EditorStore.mode]);

    useEffect(() => {
      if (EditorStore.mode === "mask") {
        if (!creatingObj && currentObjFirst?.x && currentObjSecond?.x) {
          onNewMask(currentObjFirst, currentObjSecond);
          setCurrentObjFirst(undefined);
          setCurrentObjSecond(undefined);
        }
      } else if (EditorStore.mode === "action") {
        if (!creatingObj && currentObjFirst?.x && currentObjSecond?.x) {
          EditorStore.updateAction(
            {
              x: (currentObjFirst.x + 4) / shrinkRatio,
              y: (currentObjFirst.y + 4) / shrinkRatio,
            },
            {
              x: (currentObjSecond.x + 4) / shrinkRatio,
              y: (currentObjSecond.y + 4) / shrinkRatio,
            }
          );
          setCurrentObjFirst(undefined);
          setCurrentObjSecond(undefined);
          if (EditorStore.mode === "action") EditorStore.showActionPicker();
        }
      }
    }, [currentObjSecond, creatingObj]);

    useEffect(() => {
      // setting image offsets
      if (image.current.complete) {
        setImageOffsets({
          x: image.current.getBoundingClientRect().left,
          y: image.current.getBoundingClientRect().top,
        });
      } else {
        image.current.onload = () => {
          setImageOffsets({
            x: image.current?.getBoundingClientRect().left,
            y: image.current?.getBoundingClientRect().top,
          });
        };
      }
    }, [EditorStore.currentStepData]);

    const vbMainClass = mod ? `viewbox viewbox--${mod}` : "viewbox";

    const vbCursorClass =
      EditorStore.mode === "mask" || EditorStore.mode === "action"
        ? " viewbox--crosshair"
        : "";

    const vbActionClass =
      EditorStore.mode === "action" ? " viewbox--action-mode" : "";

    const maskActions =
      EditorStore.mode === "mask" || EditorStore.mode === "action"
        ? {
            onMouseDown: (e) => {
              if (e.target === e.currentTarget) {
                if (EditorStore.actionPickerVisible)
                  EditorStore.hideActionPicker();
                else {
                  setCreatingObj(true);
                  setCurrentObjFirst({
                    x: e.clientX - imageOffsets.x,
                    y: e.clientY - imageOffsets.y,
                  });
                  if (EditorStore.mode === "action")
                    EditorStore.hideActionPicker();
                }
              }
            },
            onMouseUp: (e) => {
              if (e.target === e.currentTarget) {
                if (creatingObj) {
                  setCurrentObjSecond({
                    x: e.clientX - imageOffsets.x,
                    y: e.clientY - imageOffsets.y,
                  });
                  if (EditorStore.mode === "action")
                    EditorStore.showActionPicker();
                }
                setCreatingObj(false);
              }
            },
            onMouseMove: (e) => {
              if (e.target === e.currentTarget) {
                if (creatingObj) {
                  setCurrentObjSecond({
                    x: e.clientX - imageOffsets.x,
                    y: e.clientY - imageOffsets.y,
                  });
                }
              }
            },
            onMouseOut: (e) => {
              if (e.target === e.currentTarget) {
                if (creatingObj) {
                  setCreatingObj(false);
                  if (EditorStore.mode === "action")
                    EditorStore.showActionPicker();
                }
              }
            },
          }
        : {};
    //

    const imageLink = `${STORAGE_URL}${EditorStore.currentStepData?.imageUID}`;

    const { boxCoords } = EditorStore.currentStepData?.metaInfo;

    const getShrinkRatio = () => {
      setShrinkRatio(image.current.clientWidth / image.current.naturalWidth);
    };

    const onResize = () => {
      if (
        image.current &&
        image.current.naturalWidth !== 0 &&
        image.current.complete
      ) {
        getShrinkRatio();
      }
    };

    window.addEventListener("resize", onResize);

    const getShrinkRatioActionClass = () => {
      getShrinkRatio();
      setActionClass(
        actionStyle().width + actionStyle().left + MARGIN_FOR_ACTION >=
          image.current.clientWidth
          ? "viewbox__action--left"
          : ""
      );
    };

    const actionStyle = () => {
      const style = {
        top: boxCoords.upperLeft.y * shrinkRatio - 4,
        left: boxCoords.upperLeft.x * shrinkRatio - 4,
      };
      console.log(currentObjFirst, currentObjSecond);
      if (
        EditorStore.mode === "action" &&
        currentObjFirst &&
        currentObjSecond
      ) {
        const tempStyle = calculateTopLeft(currentObjFirst, currentObjSecond);
        style.top = tempStyle?.y;
        style.left = tempStyle?.x;
      }
      return style;
    };

    const actionButtonStyle = () => {
      const style = {
        width: boxCoords.width * shrinkRatio,
        height: boxCoords.height * shrinkRatio,
      };
      console.log(currentObjFirst, currentObjSecond);
      if (
        EditorStore.mode === "action" &&
        currentObjFirst &&
        currentObjSecond
      ) {
        style.width = calculateWidth(currentObjFirst, currentObjSecond);
        style.height = calculateHeight(currentObjFirst, currentObjSecond);
      }
      return style;
    };

    const actionButton = () => {
      switch (EditorStore.currentStepData.actionID) {
        case 1:
          return (
            <>
              <button
                className="viewbox__action-button"
                type="button"
                style={actionButtonStyle()}
              ></button>
              <span className="viewbox__action-type">
                <Icon id="mouse-left" width="42" height="42" />
              </span>
            </>
          );
        case 2:
          return (
            <EnterText
              actionClick={actionClick}
              sizes={actionButtonStyle()}
              isEditor={isEditor}
            />
          );
        case 3:
          return (
            <>
              <button
                className="viewbox__action-button"
                type="button"
                style={actionButtonStyle()}
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
      const masks = EditorStore.currentStepData.masks.map((el) => {
        return (
          <Mask
            firstPoint={el.topLeft}
            secondPoint={el.bottomRight}
            key={el.id}
          />
        );
      });
      if (
        EditorStore.mode === "mask" &&
        currentObjFirst?.x &&
        currentObjSecond?.x
      )
        masks.push(
          <Mask
            firstPoint={currentObjFirst}
            secondPoint={currentObjSecond}
            key="current"
          />
        );
      return masks;
    };

    const DeleteMasksButtons = () => {
      const buttons = EditorStore.currentStepData.masks.map((el) => {
        return (
          <DeleteMaskButton
            firstPoint={el.topLeft}
            secondPoint={el.bottomRight}
            onDeleteMask={() => onDeleteMask(el.id)}
            key={el.id}
          />
        );
      });
      return buttons;
    };

    const actionPickerStyle = () => {
      return {
        top: actionStyle().top,
        left: `calc(${
          actionStyle().left + actionButtonStyle().width + 8 + 2 + 6
        }px + 3.125rem)`,
      };
    };

    return (
      <section className={vbMainClass + vbCursorClass + vbActionClass}>
        <h2 className="visually-hidden">Текущий слайд</h2>
        <div className="viewbox__wrapper">
          <div className="viewbox__canvas" {...maskActions}>
            {DeleteMasksButtons()}
            <div
              className={`viewbox__action ${actionClass}`}
              style={actionStyle()}
            >
              {actionButton()}
            </div>
            {Masks()}
            {EditorStore.actionPickerVisible ? (
              <ActionPicker pickerStyle={actionPickerStyle()} />
            ) : null}
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
        </div>
      </section>
    );
  }
);
export default Viewbox;