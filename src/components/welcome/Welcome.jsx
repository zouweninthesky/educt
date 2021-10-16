import React from "react";
import "./Welcome.scss";

import Icon from "../common/Icon/Icon";

const Welcome = () => {
  return (
    <main className="welcome">
      <div className="welcome__wrapper">
        <h1 className="visually-hidden">Приветственная страница educt</h1>
        <Icon
          id="main-logo"
          width="192"
          height="44"
          className="welcome__logo"
        />
        <p className="welcome__description">
          Сейчас наш сервис работает в&nbsp;тестовом режиме.
        </p>
        <p className="welcome__description">
          Скоро сделаем сайт, чтобы делиться новостями и&nbsp;апдейтами, а пока
          можете поставить лайк!
        </p>
        <div className="welcome__likes">
          <button
            className="welcome__like-button button button--icon-only"
            type="button"
            onClick={() => {
              console.log("Ща все будет");
            }}
          >
            <Icon id="like" width="22" />
          </button>
          <p className="welcome__counter">12</p>
        </div>
      </div>
    </main>
  );
};

export default Welcome;
