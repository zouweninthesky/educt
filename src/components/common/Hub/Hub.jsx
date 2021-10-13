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

const Hub = observer((props) => {
  const { isAuthor } = props;

  const { scripts } = Scripts;

  const [pagesLoaded, setPagesLoaded] = useState(1);
  const [allLoaded, setAllLoaded] = useState(false);

  const checkAllLoaded = () => {
    if (scripts.length % SCRIPTS_PER_PAGE !== 0) {
      setAllLoaded(true);
    }
  };

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
          Scripts.scriptsLoad(pagesLoaded);
          setPagesLoaded((prev) => prev + 1);
          checkAllLoaded();
        }}
      >
        Загрузить ещё 15 сценариев
      </button>
    );
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
            autoHide
            autoHideTimeout={500}
            // renderView={(props) => <div className="hub__content-wrapper" />}
          >
            {/* <div className="hub__content-wrapper"> */}
            {content()}
            {loadButton()}
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
