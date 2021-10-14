import React from "react";
import { Redirect } from "react-router";

import Header from "../common/Hub/Header/Header";
import Hub from "../common/Hub/Hub";

import Auth from "../../store/auth";

const Author = () => {
  if (!Auth.isEditor) {
    return <Redirect to="/user" />;
  }

  return (
    <>
      <h1 className="visually-hidden">
        Меню выбора сценариев для редактирования
      </h1>
      <Header />
      <Hub isEditor={true} />
    </>
  );
};

export default Author;
