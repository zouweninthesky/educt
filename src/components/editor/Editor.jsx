import React, { useState } from "react";
import { Link } from "react-router-dom";

import Icon from "../common/Icon/Icon";
import Viewbox from "../common/Viewbox/Viewbox";
import Overview from "./Overview/Overview";
import Tools from "./Tools/Tools";

import "./Editor.scss";

const HEADER_TOOLS_ON = "Все слайды";
const HEADER_TOOLS_OFF = "Вернуться к списку";

const Editor = () => {
  // temp
  const [toolsShown, setTools] = useState(true);
  const onArrowClick = () => {
    setTools(false);
  };

  // will depend on currentSlide being not null
  const headerContent = toolsShown ? HEADER_TOOLS_ON : HEADER_TOOLS_OFF;
  const arrow = () => {
    if (toolsShown)
      return (
        <button className="editor__arrow-button" onClick={onArrowClick}>
          <Icon id="arrow-left" width="24" />
        </button>
      );
    return (
      <Link to="/author" className="editor__arrow-button">
        <Icon id="arrow-left" width="24" />
      </Link>
    );
  };

  return (
    <main className="editor">
      <Viewbox mod={"editor"} />

      <section className="editor__panel">
        <div className="editor__header-wrapper">
          {arrow()}
          <h2 className="editor__header">{headerContent}</h2>
        </div>
        {toolsShown ? <Tools /> : <Overview />}
      </section>
    </main>
  );
};

export default Editor;
