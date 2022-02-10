import React from "react";
import "./Comment.scss";

import Icon from "../../../Icon/Icon";

import PlayerStore from "../../../../../store/player";
import { useModal } from "../../../Modal/ModalContext";

import { STORAGE_URL } from "../../../../../utils/constants/links";
import { MODAL_COMMENT_OPENED_ID } from "../../../../../utils/constants/modals";

const Comment = ({ step }) => {
  const [modalID, setModalID] = useModal();

  const image = () => {
    if (step.metaInfo.imageUIDs) {
      const imageLink = `${STORAGE_URL}${step.metaInfo.imageUIDs[0]}?p=${PlayerStore.timeStamp}`;
      return (
        <img
          className="panel-comment__image panel-comment__image--small"
          alt="Вспомогательное изображение"
          src={imageLink}
          onClick={() => setModalID(MODAL_COMMENT_OPENED_ID)}
        />
      );
    }
    console.log("no image");
    return <></>;
  };

  const hideButton = () => {
    if (modalID === MODAL_COMMENT_OPENED_ID)
      return (
        <button
          className="panel-comment__hide-button button button--icon-only button--simple"
          onClick={() => setModalID(null)}
        >
          <Icon id="arrow-down" width="24" />
        </button>
      );
    return <></>;
  };

  const substituteDiv = () => {
    if (modalID === MODAL_COMMENT_OPENED_ID)
      return <div className="panel-comment__wrapper"></div>;
    return <></>;
  };

  const className = () => {
    let cl = "panel-comment__wrapper";
    if (step.metaInfo.imageUIDs) {
      cl += " panel-comment__wrapper--with-image";
      if (modalID === MODAL_COMMENT_OPENED_ID)
        cl += " panel-comment__wrapper--opened";
    }
    return cl;
  };

  return (
    <div className="panel-comment">
      <div className={className()}>
        {image()}
        <p className="panel-comment__text">
          {step.description === "" ? "Нет описания" : step.description}
        </p>
        {hideButton()}
      </div>
      {substituteDiv()}
    </div>
  );
};

export default Comment;
