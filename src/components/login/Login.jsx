import React, { useState } from "react";
import { useHistory, Redirect } from "react-router";

import Spinner from "../common/Spinner/Spinner";
import Authentication from "../common/Authentication/Authentication";

import Auth from "../../store/auth";

const Login = () => {
  const history = useHistory();

  const initialState = {
    login: "",
    password: "",
  };

  const [loginState, setLoginState] = useState(initialState.login);
  const [passwordState, setPasswordState] = useState(initialState.password);

  if (Auth.token) {
    return <Redirect to="/user" />;
  }

  const signIn = async (evt) => {
    evt.preventDefault();
    await Auth.SignIn(loginState, passwordState);
    if (Auth.error === null) {
      history.push("/user");
    }
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
