import React from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import "./Header.scss";

import Icon from "../../Icon/Icon";

import Auth from "../../../../store/auth";

const Header = () => {
  const history = useHistory();

  const authorLink = () => {
    if (Auth.isEditor) {
      return (
        <NavLink
          to="/author"
          className="hub-header__tab button button--simple"
          activeClassName="hub-header__tab--active"
        >
          <Icon id="puzzle-piece" width="22" />
          Конструктор
        </NavLink>
      );
    }

    return (
      <button className="hub-header__tab button button--simple" disabled>
        <Icon id="puzzle-piece" width="22" />
        Конструктор
      </button>
    );
  };

  return (
    <header className="hub-header container">
      <a href="/" className="hub-header__logo">
        <Icon id="main-logo" width="122" height="28" />
        <span className="visually-hidden">educt</span>
      </a>
      <div className="hub-header__tab-wrapper">
        <NavLink
          to="/user"
          className="hub-header__tab button button--simple"
          activeClassName="hub-header__tab--active"
        >
          <Icon id="apps" width="22" />
          Сценарии
        </NavLink>
        {authorLink()}
      </div>
      <a href="/" className="hub-header__profile-link">
        {/* <img src="#" width="46" height="46" alt="Изображение пользователя"></img> */}
        <div className="hub-header__profile-plug"></div>
        <span className="visually-hidden">Пользователь</span>
      </a>

      <div className="hub-header__dropdown">
        <ul className="hub-header__dropdown-list">
          <li className="hub-header__dropdown-item">
            <button
              className="hub-header__dropdown-link"
              type="button"
              disabled
            >
              Настройки
            </button>
          </li>
          <li className="hub-header__dropdown-item">
            {/* <button
              className="hub-header__dropdown-link"
              type="button"
              disabled={!Auth.isEditor}
            >
              Скачать приложение
            </button> */}
            <a
              className="hub-header__dropdown-link"
              href="https://educt-desktop-apps.s3.eu-north-1.amazonaws.com/EductRecorder-001.exe"
              download
            >
              Скачать приложение
            </a>
          </li>
          <li className="hub-header__dropdown-item">
            <button
              className="hub-header__dropdown-link"
              onClick={async () => {
                await Auth.SignOut();
                history.push("/login");
              }}
            >
              Выйти из аккаунта
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
