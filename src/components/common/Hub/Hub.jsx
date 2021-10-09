import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import "./Hub.scss";

import FilterDropdown from "./FilterDropdown/FilterDropdown";
import Info from "./Info/Info";
import ScriptItem from "./ScriptItem/ScriptItem";
import Spinner from "../../common/Spinner/Spinner";
import ErrorIndicator from "../../common/ErrorIndicator/ErrorIndicator";
import Overlay from "../../common/Modal/Overlay";
import DeleteScriptModal from "./modals/DeleteScriptModal";

import Scripts from "../../../store/scripts";

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
        {isAuthor ? <></> : <FilterDropdown />}

        <div className="hub__content-wrapper">
          <ul className="hub__script-list">
            {Scripts.scripts.map((script, i) => {
              return (
                <ScriptItem
                  key={script.UID}
                  id={script.UID}
                  title={script.title}
                  isAuthor={isAuthor}
                />
              );
            })}
          </ul>
        </div>
      </section>
      <Info isAuthor={isAuthor} />
      <DeleteScriptModal />
      <Overlay />
    </main>
  );
});

export default Hub;
