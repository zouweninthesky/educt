import React from "react";
import "./Author.scss";

import Header from "../common/Hub/Header/Header";
import Hub from "../common/Hub/Hub";

const Author = () => {
  return (
    <>
      <h1 className="visually-hidden">
        Меню выбора сценариев для редактирования
      </h1>
      <Header />
      <Hub isAuthor={true} />
    </>
  );
};

export default Author;
