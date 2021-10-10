import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
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

  useEffect(() => {
    Scripts.scriptsLoad();
  }, []);

  console.log(Store.loading);
  console.log(Store.error);

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
        {isAuthor ? <></> : <FilterDropdown />}

        <div className="hub__content-wrapper">
          <ul className="hub__script-list">{content()}</ul>
        </div>
      </section>
      <Info isAuthor={isAuthor} />
      <DeleteScriptModal />
      <Overlay />
    </main>
  );
});

export default Hub;
