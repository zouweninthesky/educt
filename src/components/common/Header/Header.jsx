import React from "react";
import { NavLink } from "react-router-dom";

import Icon from "../Icon/Icon";
import MainLogo from "../../../static/img/content/main-logo.svg";

import "./Header.scss";

const Header = () => {
  return (
    <header className="hub-header container">
      <a href="/" className="hub-header__logo">
        <img src={MainLogo} alt="Главный логотип eDuct" />
        <span className="visually-hidden">educt</span>
      </a>
      <div className="hub-header__tab-wrapper">
        <NavLink
          to="/user"
          className="hub-header__tab button"
          activeClassName="hub-header__tab--active"
        >
          <Icon id="apps" width="22" />
          Сценарии
        </NavLink>
        <NavLink
          to="/author"
          className="hub-header__tab button"
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
    </header>
  );
};

export default Header;
