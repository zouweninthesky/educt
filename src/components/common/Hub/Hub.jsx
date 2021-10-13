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

const Hub = observer((props) => {
  const { isAuthor } = props;

  const { scripts } = Scripts;

  const [pagesLoaded, setPagesLoaded] = useState(1);

  useEffect(() => {
    Scripts.scriptsLoad(pagesLoaded);
    setPagesLoaded((prev) => prev + 1);
  }, []);

  const content = () => {
    if (scripts && scripts.length) {
      const scriptItems = scripts.map((script, i) => {
        return (
          <ScriptItem
            key={script.UID}
            id={script.UID}
            title={script.title}
            isAuthor={isAuthor}
          />
        );
      });
      return <ul className="hub__script-list">{scriptItems}</ul>;
    } else {
      return (
        <>
          <Spinner show={true} />
        </>
      );
    }
  };

  return (
    <main className="hub container">
      <section className="hub__content">
        <h2 className="visually-hidden">Список сценариев</h2>
        <div className="hub__content-filters">
          <FilterDropdown />
        </div>
        {/* <Scrollbars autoHide autoHideTimeout={500}> */}
        <div className="hub__content-wrapper">
          <Scrollbars
          // autoHide
          // autoHideTimeout={500}
          // renderView={(props) => <div className="hub__content-wrapper" />}
          >
            {/* <div className="hub__content-wrapper"> */}
            {content()}
            <button
              className="button hub__load-button"
              onClick={() => {
                Scripts.scriptsLoad(pagesLoaded);
                setPagesLoaded((prev) => prev + 1);
              }}
            >
              Загрузить ещё 15 сценариев
            </button>
            {/* </div> */}
          </Scrollbars>
        </div>
      </section>
      <Info isAuthor={isAuthor} />
      <DeleteScriptModal />
      <Overlay />
    </main>
  );
});

export default Hub;
