import React from "react";
import "./User.scss";

import Header from "../common/Hub/Header/Header";
import Hub from "../common/Hub/Hub";

const User = () => {
  return (
    <>
      <h1 className="visually-hidden">Меню выбора сценариев для прохождения</h1>
      <Header />
      <Hub />
    </>
  );
};

export default User;
