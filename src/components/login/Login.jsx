import React from "react";
import { Link } from "react-router-dom";
import Icon from "../common/Icon/Icon";

import AuthBG from "../../static/img/content/auth-bg@4x.jpg";

import "./Login.scss";

const Login = () => {
  return (
    <main className="auth">
      <section className="auth__logo-container">
        <img
          src={AuthBG}
          alt="background"
          width="2048"
          height="3072"
          className="auth__bg"
        />
        <Icon id="main-logo" width="322" height="74" className="auth__logo" />
      </section>
      <section className="auth__content">
        <div className="auth__content-wrapper">
          <h1 className="auth__header">Войти</h1>
          <p className="auth__create-acc">
            Ещё не с нами?
            <Link to="/user">Создать аккаунт</Link>
          </p>
          <form action="post" className="auth__form">
            <div className="auth__input">
              <label htmlFor="email">Электронная почта</label>
              <input type="email" id="email" />
            </div>
            <div className="auth__input">
              <label htmlFor="password">Пароль</label>
              <input type="password" id="password" />
            </div>
            <Link className="auth__forgot-password" to="/user">
              Забыли пароль?
            </Link>
            <button className="auth__submit button" type="submit">
              Войти в аккаунт &#8594;
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;
