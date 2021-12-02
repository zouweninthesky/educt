import React, { useRef, useEffect, useState } from "react";
import { STORAGE_URL } from "../../../utils/constants/links";
import { toJS } from "mobx";

import EditorMainStore from "../../../store/editorMain";

const SavingArea = ({ step, onSaveImage }) => {
  console.log(toJS(step));

  let imgRef = useRef();
  const canvasRef = useRef();
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (naturalSize.width !== 0 && naturalSize.height !== 0) {
      console.log(
        naturalSize.width,
        naturalSize.height,
        "natural size changed"
      );
      saveImg();
    }
  }, [naturalSize]);

  const imageLink = `${STORAGE_URL}${step.imageUID}?s=${EditorMainStore.timeStamp}`;

  const changeNaturalSize = () => {
    console.log(
      imgRef.current.naturalWidth,
      imgRef.current.naturalHeight,
      "imgSizes starting to change"
    );
    setNaturalSize({
      width: imgRef.current.naturalWidth,
      height: imgRef.current.naturalHeight,
    });
  };

  const saveImg = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.fillStyle = "white";
    console.log(imgRef.current);
    ctx.drawImage(imgRef.current, 0, 0, naturalSize.width, naturalSize.height);
    step.masks.forEach((mask) => {
      ctx.fillRect(
        mask.topLeft.x,
        mask.topLeft.y,
        mask.bottomRight.x - mask.topLeft.x,
        mask.bottomRight.y - mask.topLeft.y
      );
    });
    canvasRef.current.toBlob(
      (blob) => {
        console.log(blob, "blob");
        onSaveImage({
          imageUID: step.imageUID,
          imageBin: blob,
        });
      },
      "image/jpeg",
      0.94
    );
  };

  return (
    <div>
      <button type="button" onClick={saveImg} />
      <img
        crossOrigin="anonymous"
        src={imageLink}
        ref={imgRef}
        onLoad={() => {
          changeNaturalSize();
        }}
      />
      <canvas
        width={naturalSize.width}
        height={naturalSize.height}
        ref={canvasRef}
      />
    </div>
  );
};

export default SavingArea;
