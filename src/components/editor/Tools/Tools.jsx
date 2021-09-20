import React from "react";

import Icon from "../../common/Icon/Icon";

import "./Tools.scss";

const Tools = () => {
  return (
    <section className="tools">
      <div className="tools__header-wrapper">
        <button className="tools__arrow-button">
          <Icon id="#arrow-left" width="24" />
        </button>
        <h2 className="tools__header">Все слайды</h2>
      </div>
      <ul className="tools__buttons-list">
        <li className="tools__button-item">
          <div className="tools__buttons-wrapper">
            <div className="tools__navigation-wrapper">
              <button className="tools__navigation-button">
                <Icon id="#angle-left" width="24" />
              </button>
              <p className="tools__navigation-count">
                <span>2</span>
                <span>из 3</span>
              </p>
              <button className="tools__navigation-button">
                <Icon id="#angle-right" width="24" />
              </button>
            </div>
            <div className="tools__buttons-lower-wrapper">
              <button className="tools__button tools__button--small tools__button--left">
                <Icon id="#undo" width="32" height="32" />
              </button>
              <button className="tools__button tools__button--small tools__button--right">
                <Icon id="#save" width="32" height="32" />
              </button>
            </div>
          </div>
        </li>
        <li className="tools__button-item">
          <button className="tools__button">
            <Icon id="#comment-new" width="64" />
            <h3 className="tools__button-title">Комментарий</h3>
          </button>
        </li>
        <li className="tools__button-item">
          <button className="tools__button">
            <Icon id="#action" width="64" />
            <h3 className="tools__button-title">Действие</h3>
          </button>
        </li>
        <li className="tools__button-item">
          <button className="tools__button">
            <Icon id="#microphone" width="64" />
            <h3 className="tools__button-title">Аудио</h3>
          </button>
        </li>
        <li className="tools__button-item">
          <button className="tools__button">
            <Icon id="#layer-group" width="64" />
            <h3 className="tools__button-title">Маска</h3>
          </button>
        </li>
        <li className="tools__button-item">
          <button className="tools__button">
            <Icon id="#trash" width="64" />
            <h3 className="tools__button-title">Удалить слайд</h3>
          </button>
        </li>
      </ul>
    </section>
  );
};

export default Tools;
