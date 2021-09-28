import React from "react";
import { Link } from "react-router-dom";

import Authentication from "../common/Authentication/Authentication";

const Register = () => {
  return (
    <Authentication>
      <h1 className="auth__header">Зарегистрироваться</h1>
      <p className="auth__create-acc">
        Ещё не готово
        <Link to="/user">Ещё не готово</Link>
      </p>
      <form action="post" className="auth__form">
        <div className="auth__input">
          <label htmlFor="email">Ещё не готово</label>
          <input type="email" id="email" />
        </div>
        <div className="auth__input">
          <label htmlFor="password">Ещё не готово</label>
          <input type="password" id="password" />
        </div>
        <Link className="auth__forgot-password" to="/user">
          Ещё не готово
        </Link>
        <button className="auth__submit button" type="submit">
          Ещё не готово &#8594;
        </button>
      </form>
    </Authentication>
  );
};

export default Register;
