import React from "react";
import "./NoScripts.scss";

import ScriptsStore from "../../../../store/scripts";

const NoScripts = ({ isEditor, isFiltered }) => {
  const header = () => {
    if (isFiltered) return "Нет сценариев, подходящих под\u00a0Ваш запрос";
    return isEditor
      ? "Пока что нечего редактировать!"
      : "Редактор скоро подготовит материалы для вас!";
  };

  const description = () => {
    if (isFiltered) return "Попробуйте снова";
    return isEditor
      ? "Сначала нужно записать сценарий, для этого необходимо загрузить десктопное приложение"
      : "Список сценариев пока что пустой.";
  };

  const button = () => {
    if (isFiltered)
      return (
        <button
          type="button"
          className="button no-scripts__button"
          onClick={() => ScriptsStore.applyStateFilter(0)}
        >
          Ко всем сценариям
        </button>
      );
    return isEditor ? (
      // <a
      //   href="https://educt-desktop-apps.s3.eu-north-1.amazonaws.com/EductRecorder-001.exe"
      //   download
      //   className="button no-scripts__button"
      // >
      //   <Icon id="arrow-down" width="22" />
      //   Приложение для Windows
      // </a>
      <></>
    ) : (
      <></>
    );
  };

  return (
    <div className="no-scripts">
      <div className="no-scripts__wrapper">
        <h2 className="no-scripts__header">{header()}</h2>
        <p className="no-scripts__description">{description()}</p>
        {button()}
      </div>
    </div>
  );
};

export default NoScripts;
