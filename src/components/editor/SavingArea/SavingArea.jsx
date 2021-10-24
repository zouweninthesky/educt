import React, { useRef, useEffect, useState } from "react";
import { STORAGE_URL } from "../../../utils/constants/links";
import { toJS } from "mobx";

const SavingArea = ({ step, onSaveImage }) => {

  console.log(toJS(step));

  let imgRef = useRef();
  const canvasRef = useRef();
  const [naturalSize, setNaturalSize] = useState({ width: 2000, height: 1000 });

  const changeNaturalSize = () => {
    setNaturalSize({ width: imgRef.current.naturalWidth, height: imgRef.current.naturalHeight });
  };

  const saveImg = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.fillStyle = "white";
    console.log(imgRef.current);
    ctx.drawImage(imgRef.current, 0, 0, naturalSize.width, naturalSize.height);
    step.masks.forEach((mask) => {
      ctx.fillRect(mask.topLeft.x / step.shrinkRatio,
        mask.topLeft.y / step.shrinkRatio,
        (mask.bottomRight.x - mask.topLeft.x) / step.shrinkRatio,
        (mask.bottomRight.y - mask.topLeft.y) / step.shrinkRatio);
    });
    canvasRef.current.toBlob((blob) => {
      onSaveImage({
        imageUID: step.imageUID,
        imageBin: blob
      })
    })

  };

  return (
    <div>
      <button type='button' onClick={saveImg} />
      <img crossOrigin='anonymous' src={`${STORAGE_URL}${step.imageUID}`} ref={imgRef} onLoad={() => {
        changeNaturalSize();
        saveImg();
      }} />
      <canvas width={naturalSize.width} height={naturalSize.height} ref={canvasRef} />
    </div>
  );
};

export default SavingArea;