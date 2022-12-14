import React from "react";
import { observer } from "mobx-react-lite";

import Header from "../common/Header/Header";
import Hub from "../common/Hub/Hub";

const User = observer(() => {
  return (
    <>
      <h1 className="visually-hidden">Меню выбора сценариев для прохождения</h1>
      <Header />
      <Hub isEditor={false} />
    </>
  );
});

export default User;
