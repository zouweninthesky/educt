import React from "react";

import { useModal } from "../../common/Modal/ModalContext";
import Icon from "../../common/Icon/Icon";

import "./Tools.scss";

const Tools = () => {
  const [, setModalID] = useModal();

  return (
    <div className="tools">
      <ul className="tools__buttons-list">
        <li className="tools__button-item">
          <div className="tools__buttons-wrapper">
            <button className="tools__navigation-button" type="button">
              <Icon id="angle-left" width="24" />
            </button>
            <p className="tools__navigation-count">
              <span>2</span>
              <span>из 3</span>
            </p>
            <button className="tools__navigation-button" type="button">
              <Icon id="angle-right" width="24" />
            </button>
          </div>
        </li>
        <li className="tools__button-item">
          <button
            className="tools__button"
            type="button"
            onClick={() => setModalID("comment")}
          >
            <Icon id="comment-new" width="64" />
            <h3 className="tools__button-title">Комментарий</h3>
          </button>
        </li>
        <li className="tools__button-item">
          <button className="tools__button" type="button">
            <Icon id="action" width="64" />
            <h3 className="tools__button-title">Действие</h3>
          </button>
        </li>
        <li className="tools__button-item">
          <button className="tools__button" type="button">
            <Icon id="microphone" width="64" />
            <h3 className="tools__button-title">Аудио</h3>
          </button>
        </li>
        <li className="tools__button-item">
          <button className="tools__button" type="button">
            <Icon id="layer-group" width="64" />
            <h3 className="tools__button-title">Маска</h3>
          </button>
        </li>
        <li className="tools__button-item">
          <button
            className="tools__button"
            type="button"
            onClick={() => setModalID("delete")}
          >
            <Icon id="trash" width="64" />
            <h3 className="tools__button-title">Удалить слайд</h3>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Tools;