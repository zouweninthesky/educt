import React, { useState } from "react";

import Icon from "../../../common/Icon/Icon";

const NOT_FULLSCREEN_ID = "focus-finish";
const FULLSCREEN_ID = "focus";

const FullScreenButton = () => {
  const [fullScreen, setFullScreen] = useState(false);

  const enterFullscreen = () => {
    toggleFullScreen();
  };

  const toggleFullScreen = () => {
    if (!fullScreen) {
      setFullScreen(true);
      if (document.requestFullscreen) {
        document.requestFullscreen();
      } else {
        document.webkitRequestFullscreen();
      }
    } else {
      setFullScreen(false);
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else {
        document.webkitExitFullscreen();
      }
    }
  };

  const svgId = fullScreen ? NOT_FULLSCREEN_ID : FULLSCREEN_ID;

  return (
    <button
      type="button"
      className="panel__button button button--simple button--icon-only"
      onClick={enterFullscreen}
    >
      <Icon id={svgId} width="24" />
    </button>
  );
};

export default FullScreenButton;
