import React from "react";
import "./Welcome.scss";

import Icon from "../common/Icon/Icon";
import Like from "./Like/Like";

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
        <Like />
      </div>
    </main>
  );
};

export default Welcome;
