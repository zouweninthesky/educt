import React from "react";
import Icon from "../../Icon/Icon";
import "./NoScripts.scss";

const NoScripts = ({ isEditor }) => {
  const header = isEditor
    ? "Пока что нечего редактировать!"
    : "Редактор скоро подготовит материалы для вас!";
  const description = isEditor
    ? "Сначала нужно записать сценарий, для этого необходимо загрузить десктопное приложение"
    : "Список сценариев пока что пустой.";
  const button = () =>
    isEditor ? (
      <button type="button" className="button no-scripts__button">
        <Icon id="arrow-down" width="22" />
        Приложение для Windows
      </button>
    ) : (
      <></>
    );
  return (
    <div className="no-scripts">
      <div className="no-scripts__wrapper">
        <h2 className="no-scripts__header">{header}</h2>
        <p className="no-scripts__description">{description}</p>
        {button()}
      </div>
    </div>
  );
};

export default NoScripts;
