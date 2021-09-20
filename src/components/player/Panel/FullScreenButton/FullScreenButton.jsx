import React, { useState } from "react";

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
      <svg width="24" height="24">
        <use xlinkHref={svgId} />
      </svg>
    </button>
  );
};

export default FullScreenButton;
