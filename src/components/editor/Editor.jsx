import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Editor.scss";

import Icon from "../common/Icon/Icon";
import Viewbox from "../common/Viewbox/Viewbox";
import Overview from "./Overview/Overview";
import Tools from "./Tools/Tools";
import DeleteModal from "./modals/DeleteModal";
import Overlay from "../common/Modal/Overlay";
import CommentModal from "./modals/CommentModal";
import SettingsModal from "./modals/SettingsModal";
import NoSaveModal from "./modals/NoSaveModal";
import { useModal } from "../common/Modal/ModalContext";

const HEADER_TOOLS_ON = "Все слайды";
const HEADER_TOOLS_OFF = "Вернуться к списку";

const Editor = () => {
  const [, setModalID] = useModal();

  // temp
  const [toolsShown, setTools] = useState(true);
  const onArrowClick = () => {
    setTools(false);
  };

  // will depend on currentSlide being not null

  const headerContent = () => {
    if (toolsShown)
      return (
        <>
          <button
            className="editor__arrow-button button button--simple button--icon-only"
            type="button"
            onClick={onArrowClick}
          >
            <Icon id="arrow-left" width="24" />
          </button>
          <h2 className="editor__header">{HEADER_TOOLS_ON}</h2>
        </>
      );

    return (
      <>
        <Link
          to="/author"
          className="editor__arrow-button button button--simple button--icon-only"
        >
          <Icon id="arrow-left" width="24" />
        </Link>
        <h2 className="editor__header">{HEADER_TOOLS_OFF}</h2>
        <button
          className="editor__save-button button button--simple"
          type="button"
        >
          <Icon id="save" width="22" />
          Сохранить и выйти
        </button>
      </>
    );
  };

  return (
    <main className="editor">
      <Viewbox mod={"editor"} />

      <section className="editor__panel">
        <div className="editor__header-wrapper">{headerContent()}</div>
        {toolsShown ? <Tools /> : <Overview />}
      </section>
      <CommentModal />
      <DeleteModal />
      <NoSaveModal />
      <SettingsModal />
      <Overlay />
    </main>
  );
};

export default Editor;
