import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.scss";

import Icon from "../../Icon/Icon";

import Auth from "../../../../store/Auth";

const Header = () => {
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
        <NavLink
          to="/author"
          className="hub-header__tab button button--simple"
          activeClassName="hub-header__tab--active"
        >
          <Icon id="puzzle-piece" width="22" />
          Конструктор
        </NavLink>
      </div>
      <a href="/" className="hub-header__profile-link">
        {/* <img src="#" width="46" height="46" alt="Изображение пользователя"></img> */}
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
            <button
              className="hub-header__dropdown-link"
              onClick={() => {
                Auth.SignOut();
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
