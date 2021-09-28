import React from "react";
import { Link } from "react-router-dom";

import Authentication from "../common/Authentication/Authentication";

const Login = () => {
  return (
    <Authentication>
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
    </Authentication>
  );
};

export default Login;
