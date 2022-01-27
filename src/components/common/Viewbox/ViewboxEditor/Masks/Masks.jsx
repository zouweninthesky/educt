import React from "react";
import "../../Viewbox.scss";

import Mask from "../../../../editor/mask/Mask";

import EditorMainStore from "../../../../../store/editorMain";
import EditorStepStore from "../../../../../store/editorStep";
import EditorMaskStore from "../../../../../store/editorMask";

const Masks = ({ shrinkRatio, currentObjFirst, currentObjSecond }) => {
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
  return null;
};

export default Masks;
