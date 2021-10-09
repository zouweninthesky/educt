import React from "react";
import "./Authentication.scss";

import Icon from "../Icon/Icon";

import AuthBG from "../../../static/img/content/auth-bg@4x.jpg";

const Authentication = (props) => {
  const className = props.modifier ? `auth auth--${props.modifier}` : "auth";

  return (
    <main className={className}>
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
        <div className="auth__content-wrapper">{props.children}</div>
      </section>
    </main>
  );
};

export default Authentication;
