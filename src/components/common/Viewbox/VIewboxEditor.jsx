import React, { useRef, useState, useEffect } from "react";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import "./Viewbox.scss";

import Icon from "../Icon/Icon";
import ActionPicker from "./ActionPicker/ActionPicker";
import EnterText from "./EnterText/EnterText";
import Mask from "../../editor/mask/Mask";
import Spinner from "../Spinner/Spinner";

import EditorStore from "../../../store/editor";

import { STORAGE_URL } from "../../../utils/constants/links";
import DeleteMaskButton from "../../editor/mask/deleteMaskButton/DeleteMaskButton";
import {
  calculateTopLeft,
  calculateWidth,
  calculateHeight,
  calculateBottomRight,
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
      if (imageRef.current.complete) EditorStore.finishImageLoad();
      setShrinkRatio(
        imageRef.current?.complete
          ? imageRef.current.clientWidth / imageRef.current.naturalWidth
          : 1
      );
    });

    // ?????
    useEffect(() => {
      EditorStore.changeShrinkRatio(shrinkRatio);
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
      return EditorStore.mode === "action" && creatingObj
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
      EditorStore.mode,
      EditorStore.currentStepData,
      EditorStore.currentStepNumber,
    ]);

    useEffect(() => {
      if (EditorStore.mode === "mask") {
        if (!creatingObj && currentObjFirst?.x && currentObjSecond?.x) {
          // console.log(currentObjFirst, currentObjSecond)
          EditorStore.addMask(
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
        }
      }
    }, [currentObjSecond, creatingObj]);

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
                console.log(e);
                if (creatingObj) {
                  setCreatingObj(false);
                  if (EditorStore.mode === "action")
                    EditorStore.showActionPicker();
                }
              }
            },
          }
        : {};

    const imageLink = `${STORAGE_URL}${EditorStore.currentStepData?.imageUID}?e=${EditorStore.timeStamp}`;

    const { boxCoords } = EditorStore.currentStepData?.metaInfo;

    const actionStyle = () => {
      const style = {
        top: boxCoords.upperLeft.y * shrinkRatio - 4,
        left: boxCoords.upperLeft.x * shrinkRatio - 4,
        display: EditorStore.imageLoaded ? "block" : "none",
      };
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
                ref={actionButtonRef}
              ></button>
              <span
                className="viewbox__action-type"
                onClick={() => EditorStore.toggleActionPickerVisible()}
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
                onClick={() => EditorStore.toggleActionPickerVisible()}
              >
                <Icon id="mouse-right" width="42" height="42" />
              </span>
            </>
          );
        default:
      }
    };

    const Masks = () => {
      let masks;
      if (EditorStore.imageLoaded) {
        // console.log(toJS(EditorStore.currentStepData.masks), toJS(shrinkRatio));
        const masks = EditorStore.currentStepData.masks.map((el) => {
          return (
            <Mask
              shrinkRatio={EditorStore.currentStepData.shrinkRatio}
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
              current={true}
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
      const buttons = EditorStore.currentStepData.masks.map((el) => {
        return (
          <DeleteMaskButton
            shrinkRatio={shrinkRatio}
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
          <Spinner show={!EditorStore.imageLoaded} />
          <div className="viewbox__canvas" {...maskActions}>
            {DeleteMasksButtons()}
            {EditorStore.actionPickerVisible ? (
              <ActionPicker pickerStyle={actionPickerStyle()} />
            ) : null}
          </div>
          {Masks()}
          <div
            className={`viewbox__action ${actionClass} ${actionMountedClass()}`}
            style={actionStyle()}
            ref={actionRef}
          >
            {actionButton()}
          </div>
          <img
            className="viewbox__image"
            alt="Текущий слайд"
            src={imageLink}
            ref={imageRef}
            onLoad={() => {
              EditorStore.finishImageLoad();
              console.log(1111);
              updateShrinkRatioActionClass();
            }}
          />
        </div>
      </section>
    );
  }
);
export default Viewbox;
