import React, { useState } from "react";

import Icon from "../../../common/Icon/Icon";

const FULLSCREEN_ID = "#zoom";
const NOT_FULLSCREEN_ID = "#focus";

const FullScreenButton = () => {
  const [fullScreen, setFullScreen] = useState(false);

  const enterFullscreen = () => {
    toggleFullScreen();
  };

  const toggleFullScreen = () => {
    if (!fullScreen) {
      setFullScreen(true);
      document.documentElement.requestFullscreen();
    } else {
      setFullScreen(false);
      document.exitFullscreen();
    }
  };

  const svgId = fullScreen ? FULLSCREEN_ID : NOT_FULLSCREEN_ID;

  return (
    <button type="button" className="panel__button" onClick={enterFullscreen}>
      <Icon id={svgId} width="24" />
    </button>
  );
};

export default FullScreenButton;
