import React, { useRef, useState, useEffect } from "react";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import "./Viewbox.scss";

import Icon from "../Icon/Icon";
import ActionPicker from "./ActionPicker/ActionPicker";
import EnterText from "./EnterText/EnterText";
import Mask from "../../editor/mask/Mask";
import Spinner from "../Spinner/Spinner";

// import EditorStore from "../../../store/editor";
import EditorMainStore from "../../../store/editorMain";
import EditorStepStore from "../../../store/editorStep";
import EditorMaskStore from "../../../store/editorMask";

import { STORAGE_URL } from "../../../utils/constants/links";
import DeleteMaskButton from "../../editor/mask/deleteMaskButton/DeleteMaskButton";
import {
  calculateTopLeft,
  calculateWidth,
  calculateHeight,
  calculateBottomRight,
} from "../../../utils/calculateMaskCoords";

const MARGIN_FOR_ACTION = 70;

const ViewboxEditor = observer(
  ({
    mod,
    actionClick,
    onNewMask,
    isEditor,
    onDeleteMask,
    onShrinkRatioChange,
  }) => {
    const imageRef = useRef(null);
    const actionRef = useRef(null);
    const actionButtonRef = useRef(null);

    const [shrinkRatio, setShrinkRatio] = useState(
      imageRef.current?.complete
        ? imageRef.current.clientWidth / imageRef.current.naturalWidth
        : 1
    );

    // const [imageLoad, setImageLoad] = useState(false);

    useEffect(() => {
      if (imageRef.current.complete) EditorStepStore.finishImageLoad();
      setShrinkRatio(
        imageRef.current?.complete
          ? imageRef.current.clientWidth / imageRef.current.naturalWidth
          : 1
      );
    });

    // ?????
    useEffect(() => {
      EditorStepStore.changeShrinkRatio(shrinkRatio);
    }, [shrinkRatio]);
    // ?????

    const updateShrinkRatio = () => {
      setShrinkRatio(
        imageRef.current?.clientWidth / imageRef.current?.naturalWidth
      );
    };

    const calculateImageChanges = () => {
      if (imageRef.current?.complete && imageRef.current?.clientWidth > 0) {
        updateShrinkRatio();
        setImageOffsets({
          x: imageRef.current.getBoundingClientRect().left,
          y: imageRef.current.getBoundingClientRect().top,
        });
      } else {
        imageRef.current.onload = () => {
          updateShrinkRatio();
          setImageOffsets({
            x: imageRef.current?.getBoundingClientRect().left,
            y: imageRef.current?.getBoundingClientRect().top,
          });
        };
      }
    };

    useEffect(() => {
      window.addEventListener("resize", calculateImageChanges);
      return () => {
        window.removeEventListener("resize", calculateImageChanges);
      };
    });

    const [actionClass, setActionClass] = useState(
      imageRef.complete
        ? actionStyle().width + actionStyle().left + MARGIN_FOR_ACTION >=
          imageRef.current.clientWidth
          ? "viewbox__action--left"
          : ""
        : ""
    );

    const actionMountedClass = () => {
      return EditorMainStore.mode === "action" && creatingObj
        ? "viewbox__action--not-mounted"
        : "";
    };

    const updateShrinkRatioActionClass = () => {
      calculateImageChanges();
      setActionClass(
        actionStyle().width + actionStyle().left + MARGIN_FOR_ACTION >=
          imageRef.current.clientWidth
          ? "viewbox__action--left"
          : ""
      );
    };

    // diff
    const [imageOffsets, setImageOffsets] = useState({ x: 0, y: 0 });
    const [currentObjFirst, setCurrentObjFirst] = useState(undefined);
    const [currentObjSecond, setCurrentObjSecond] = useState(undefined);
    const [creatingObj, setCreatingObj] = useState(false);

    useEffect(() => {
      calculateImageChanges();
    }, [
      EditorMainStore.mode,
      EditorStepStore.currentStepData,
      EditorStepStore.currentStepNumber,
    ]);

    useEffect(() => {
      if (EditorMainStore.mode === "mask") {
        if (!creatingObj && currentObjFirst?.x && currentObjSecond?.x) {
          // console.log(currentObjFirst, currentObjSecond)
          EditorMaskStore.addMask(
            calculateTopLeft(
              {
                x: currentObjFirst.x / shrinkRatio,
                y: currentObjFirst.y / shrinkRatio,
              },
              {
                x: currentObjSecond.x / shrinkRatio,
                y: currentObjSecond.y / shrinkRatio,
              }
            ),
            calculateBottomRight(
              {
                x: currentObjFirst.x / shrinkRatio,
                y: currentObjFirst.y / shrinkRatio,
              },
              {
                x: currentObjSecond.x / shrinkRatio,
                y: currentObjSecond.y / shrinkRatio,
              }
            )
          );
          setCurrentObjFirst(undefined);
          setCurrentObjSecond(undefined);
        }
      } else if (EditorMainStore.mode === "action") {
        if (!creatingObj && currentObjFirst?.x && currentObjSecond?.x) {
          EditorStepStore.updateAction(
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
        }
      }
    }, [currentObjSecond, creatingObj]);

    const vbMainClass = mod ? `viewbox viewbox--${mod}` : "viewbox";

    const vbCursorClass =
      EditorMainStore.mode === "mask" || EditorMainStore.mode === "action"
        ? " viewbox--crosshair"
        : "";

    const vbActionClass =
      EditorMainStore.mode === "action" ? " viewbox--action-mode" : "";

    const drawingHandlers =
      EditorMainStore.mode === "mask" || EditorMainStore.mode === "action"
        ? {
            onMouseDown: (e) => {
              if (e.target === e.currentTarget) {
                if (EditorStepStore.actionPickerVisible)
                  EditorStepStore.hideActionPicker();
                else {
                  setCreatingObj(true);
                  setCurrentObjFirst({
                    x: e.clientX - imageOffsets.x,
                    y: e.clientY - imageOffsets.y,
                  });
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
                  if (EditorMainStore.mode === "action")
                    EditorStepStore.showActionPicker();
                }
              }
            },
          }
        : {};

    const imageLink = `${STORAGE_URL}${EditorStepStore.currentStepData?.imageUID}?e=${EditorMainStore.timeStamp}`;

    const { boxCoords } = EditorStepStore.currentStepData?.metaInfo;

    const actionStyle = () => {
      const style = {
        top: boxCoords.upperLeft.y * shrinkRatio - 4,
        left: boxCoords.upperLeft.x * shrinkRatio - 4,
        display: EditorStepStore.imageLoaded ? "block" : "none",
      };
      if (
        EditorMainStore.mode === "action" &&
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
      if (
        EditorMainStore.mode === "action" &&
        currentObjFirst &&
        currentObjSecond
      ) {
        style.width = calculateWidth(currentObjFirst, currentObjSecond);
        style.height = calculateHeight(currentObjFirst, currentObjSecond);
      }
      return style;
    };

    const actionButton = () => {
      switch (EditorStepStore.currentStepData.actionID) {
        case 1:
          return (
            <>
              <button
                className="viewbox__action-button"
                type="button"
                style={actionButtonStyle()}
                ref={actionButtonRef}
              ></button>
              <span
                className="viewbox__action-type"
                onClick={() => EditorStepStore.toggleActionPickerVisible()}
              >
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
              ref={actionButtonRef}
            />
          );
        case 3:
          return (
            <>
              <button
                className="viewbox__action-button"
                type="button"
                style={actionButtonStyle()}
                ref={actionButtonRef}
              ></button>
              <span
                className="viewbox__action-type"
                onClick={() => EditorStepStore.toggleActionPickerVisible()}
              >
                <Icon id="mouse-right" width="42" height="42" />
              </span>
            </>
          );
        default:
      }
    };

    const Masks = () => {
      if (EditorStepStore.imageLoaded) {
        const maskArray = [...EditorMaskStore.currentMasks];
        const masks = maskArray.map((el) => {
          return (
            <Mask
              shrinkRatio={shrinkRatio}
              firstPoint={el.topLeft}
              secondPoint={el.bottomRight}
              key={el.UID}
            />
          );
        });
        if (
          EditorMainStore.mode === "mask" &&
          currentObjFirst?.x &&
          currentObjSecond?.x
        )
          masks.push(
            <Mask
              shrinkRatio={1}
              firstPoint={currentObjFirst}
              secondPoint={currentObjSecond}
              key="current"
            />
          );
        return masks;
      }
    };

    const DeleteMasksButtons = () => {
      const maskArray = [...EditorMaskStore.currentMasks];
      const buttons = maskArray.map((el) => {
        return (
          <DeleteMaskButton
            shrinkRatio={shrinkRatio}
            firstPoint={el.topLeft}
            secondPoint={el.bottomRight}
            onDeleteMask={() => onDeleteMask(el.UID)}
            key={el.UID}
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

    const actionBorders = () => {
      if (EditorMainStore.mode === "action") {
        return (
          <>
            <div
              className="viewbox__action-border viewbox__action-border--top"
              onMouseDown={() => {
                console.log("I'm top");
              }}
            ></div>
            <div
              className="viewbox__action-border viewbox__action-border--bottom"
              onMouseDown={() => {
                console.log("I'm bottom");
              }}
            ></div>
            <div
              className="viewbox__action-border viewbox__action-border--left"
              onMouseDown={() => {
                console.log("I'm left");
              }}
            ></div>
            <div
              className="viewbox__action-border viewbox__action-border--right"
              onMouseDown={() => {
                console.log("I'm right");
              }}
            ></div>
          </>
        );
      }
    };

    return (
      <section className={vbMainClass + vbCursorClass + vbActionClass}>
        <h2 className="visually-hidden">Текущий слайд</h2>
        <div className="viewbox__wrapper">
          <Spinner show={!EditorStepStore.imageLoaded} />
          <div className="viewbox__canvas" {...drawingHandlers}>
            {DeleteMasksButtons()}
            {EditorStepStore.actionPickerVisible ? (
              <ActionPicker pickerStyle={actionPickerStyle()} />
            ) : null}
          </div>
          {Masks()}
          <div
            className={`viewbox__action ${actionClass} ${actionMountedClass()}`}
            style={actionStyle()}
            ref={actionRef}
          >
            {/* {actionBorders()} */}
            {actionButton()}
          </div>
          <img
            className="viewbox__image"
            alt="Текущий слайд"
            src={imageLink}
            ref={imageRef}
            onLoad={() => {
              EditorStepStore.finishImageLoad();
              updateShrinkRatioActionClass();
            }}
          />
        </div>
      </section>
    );
  }
);
export default ViewboxEditor;
