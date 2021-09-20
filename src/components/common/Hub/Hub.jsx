import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import Dropdown from "../Dropdown/Dropdown";
import Info from "./Info/Info";
import ScriptItem from "./ScriptItem/ScriptItem";
import Spinner from "../../common/Spinner/Spinner";
import ErrorIndicator from "../../common/ErrorIndicator/ErrorIndicator";

import Scripts from "../../../store";

import "./Hub.scss";

const Hub = observer((props) => {
  const { isAuthor } = props;

  useEffect(() => {
    Scripts.scriptsLoad();
  }, []);

  if (Scripts.loading) {
    return <Spinner />;
  }

  if (Scripts.error) {
    return <ErrorIndicator />;
  }

  return (
    <main className="hub container">
      <section className="hub__content">
        <h2 className="visually-hidden">Список сценариев</h2>
        {isAuthor ? <></> : <Dropdown />}

        <div className="hub__content-wrapper">
          <ul className="hub__script-list">
            {Scripts.scripts.map((script, i) => {
              return <ScriptItem key={i} id={script.id} title={script.title} />;
            })}
          </ul>
        </div>
      </section>
      <Info isAuthor={isAuthor} />
    </main>
  );
});

export default Hub;
