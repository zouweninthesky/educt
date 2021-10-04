import React, { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner/Spinner";

import Authentication from "../common/Authentication/Authentication";

import Auth from "../../store/Auth";

const Login = () => {
  const initialState = {
    login: "",
    password: "",
  };

  const [loginState, setLoginState] = useState(initialState.login);
  const [passwordState, setPasswordState] = useState(initialState.login);

  const signIn = async (evt) => {
    evt.preventDefault();
    await Auth.SignIn(loginState, passwordState);
  };

  const loading = false;

  return (
    <Authentication>
      <h1 className="auth__header">Войти</h1>
      <form onSubmit={(e) => signIn(e)} className="auth__form">
        <div className="auth__input">
          <label htmlFor="email">Электронная почта</label>
          <input
            type="email"
            id="email"
            value={loginState}
            onInput={(e) => setLoginState(e.target.value)}
          />
        </div>
        <div className="auth__input">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={passwordState}
            onInput={(e) => setPasswordState(e.target.value)}
          />
        </div>
        <button className="auth__submit button" type="submit">
          Войти в аккаунт &#8594;
        </button>
      </form>
      <Spinner show={loading} />
    </Authentication>
  );
};

export default Login;
