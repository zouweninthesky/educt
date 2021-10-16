import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Scrollbars } from "react-custom-scrollbars";
import "./Hub.scss";

import FilterDropdown from "./FilterDropdown/FilterDropdown";
import Info from "./Info/Info";
import ScriptItem from "./ScriptItem/ScriptItem";
import Spinner from "../../common/Spinner/Spinner";
import Loader from "../Loader/Loader";
import ErrorIndicator from "../../common/ErrorIndicator/ErrorIndicator";
import Overlay from "../../common/Modal/Overlay";
import DeleteScriptModal from "./modals/DeleteScriptModal";

import Scripts from "../../../store/scripts";
import Store from "../../../store";
import { SCRIPTS_PER_PAGE } from "../../../utils/constants/links";
import NoScripts from "./NoScripts/NoScripts";

const Hub = observer((props) => {
  const { isEditor } = props;

  const { scripts, allLoaded } = Scripts;

  useEffect(() => {
    Scripts.scriptsClear();
    Scripts.scriptsLoad();
  }, []);

  const loadButton = () => {
    if (allLoaded) {
      return (
        <button className="button hub__load-button" disabled>
          Все сценарии уже загружены
        </button>
      );
    }
    return (
      <button
        className="button hub__load-button"
        onClick={() => {
          Scripts.scriptsLoad();
        }}
      >
        Загрузить ещё 15 сценариев
      </button>
    );
  };

  const content = () => {
    if (scripts) {
      if (scripts.length !== 0) {
        const scriptItems = scripts.map((script, i) => {
          return (
            <ScriptItem
              key={script.UID}
              id={script.UID}
              title={script.title}
              isEditor={isEditor}
            />
          );
        });
        return (
          <>
            <div className="hub__content-filters">
              <FilterDropdown />
            </div>
            <div className="hub__content-wrapper">
              <Scrollbars autoHide autoHideTimeout={500}>
                <ul className="hub__script-list">{scriptItems}</ul>
                {loadButton()}
              </Scrollbars>
            </div>
          </>
        );
      } else {
        return <NoScripts isEditor={isEditor} />;
      }
    } else {
      return (
        <>
          <div className="hub__content-filters">
            <FilterDropdown />
          </div>
          <div className="hub__content-wrapper">
            <Spinner show={true} />
          </div>
        </>
      );
    }
  };

  return (
    <main className="hub container">
      <section className="hub__content">
        <h2 className="visually-hidden">Список сценариев</h2>
        {content()}
      </section>
      <Info isEditor={isEditor} />
      <DeleteScriptModal />
      <Overlay />
    </main>
  );
});

export default Hub;
