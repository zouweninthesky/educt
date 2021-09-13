import React from "react";

import "./Tools.scss";

const Tools = () => {
  return (
    <section className="tools">
      <div className="tools__header-wrapper">
        <button className="tools__arrow-button">
          <svg width="24" height="24">
            <use xlinkHref="#arrow-left" />
          </svg>
        </button>
        <h2 className="tools__header">Все слайды</h2>
      </div>
      <ul className="tools__buttons-list">
        <li className="tools__button-item">
          <div className="tools__buttons-wrapper">
            <div className="tools__navigation-wrapper">
              <button className="tools__navigation-button">
                <svg width="24" height="24">
                  <use xlinkHref="#angle-left" />
                </svg>
              </button>
              <p className="tools__navigation-count">
                <span>2</span>
                <span>из 3</span>
              </p>
              <button className="tools__navigation-button">
                <svg width="24" height="24">
                  <use xlinkHref="#angle-right" />
                </svg>
              </button>
            </div>
            <div className="tools__buttons-lower-wrapper">
              <button className="tools__button tools__button--small tools__button--left">
                <svg width="32" height="32">
                  <use xlinkHref="#undo" />
                </svg>
              </button>
              <button className="tools__button tools__button--small tools__button--right">
                <svg width="32" height="32">
                  <use xlinkHref="#save" />
                </svg>
              </button>
            </div>
          </div>
        </li>
        <li className="tools__button-item">
          <button className="tools__button">
            <svg width="64" height="64">
              <use xlinkHref="#comment-new" />
            </svg>
            <h3 className="tools__button-title">Комментарий</h3>
          </button>
        </li>
        <li className="tools__button-item">
          <button className="tools__button">
            <svg width="64" height="64">
              <use xlinkHref="#action" />
            </svg>
            <h3 className="tools__button-title">Действие</h3>
          </button>
        </li>
        <li className="tools__button-item">
          <button className="tools__button">
            <svg width="64" height="64">
              <use xlinkHref="#microphone" />
            </svg>
            <h3 className="tools__button-title">Аудио</h3>
          </button>
        </li>
        <li className="tools__button-item">
          <button className="tools__button">
            <svg width="64" height="64">
              <use xlinkHref="#layer-group" />
            </svg>
            <h3 className="tools__button-title">Маска</h3>
          </button>
        </li>
        <li className="tools__button-item">
          <button className="tools__button">
            <svg width="64" height="64">
              <use xlinkHref="#trash" />
            </svg>
            <h3 className="tools__button-title">Удалить слайд</h3>
          </button>
        </li>
      </ul>
    </section>
  );
};

export default Tools;
