import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Scrollbars } from "react-custom-scrollbars";
import "./Hub.scss";

import FilterDropdown from "./FilterDropdown/FilterDropdown";
import Info from "./Info/Info";
import ScriptItem from "./ScriptItem/ScriptItem";
import Spinner from "../../common/Spinner/Spinner";
import Overlay from "../../common/Modal/Overlay";
import DeleteScriptModal from "./modals/HubDeleteScriptModal";
import NoScripts from "./NoScripts/NoScripts";

import ScriptsStore from "../../../store/scripts";

const Hub = observer(({ isEditor }) => {
  const { scripts, allLoaded } = ScriptsStore;

  useEffect(() => {
    (async () => {
      ScriptsStore.scriptsClear();
      await ScriptsStore.scriptsLoad();
    })();
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
          ScriptsStore.scriptsLoad();
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
              state={script.state}
              isPublished={script.isPublished}
              title={script.title}
              createTime={script.createTime}
              isEditor={isEditor}
            />
          );
        });
        return (
          <>
            <div className="hub__content-filters">
              <FilterDropdown isEditor={isEditor} />
            </div>
            <div className="hub__content-wrapper">
              <Scrollbars autoHide autoHideTimeout={500}>
                <ul className="hub__script-list">{scriptItems}</ul>
                {loadButton()}
              </Scrollbars>
            </div>
          </>
        );
      } else
        return (
          <>
            <div className="hub__content-filters">
              {ScriptsStore.stateFilterID !== 0 ? (
                <FilterDropdown isEditor={isEditor} />
              ) : (
                <></>
              )}
            </div>
            <NoScripts
              isEditor={isEditor}
              isFiltered={ScriptsStore.stateFilterID}
            />
          </>
        );
    } else if (scripts && scripts.length === 0) {
      return (
        <>
          <div className="hub__content-filters">
            <FilterDropdown isEditor={isEditor} />
          </div>
          <div className="hub__content-wrapper">
            <Spinner show={true} />
          </div>
        </>
      );
    } else {
      return <Spinner show={true} />;
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
