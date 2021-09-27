import React from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import Icon from "../../Icon/Icon";
import Scripts from "../../../../store";

import "./Info.scss";

const Info = observer((props) => {
  const { isAuthor } = props;

  const { chosenScript } = Scripts;

  if (chosenScript === null) {
    return <></>;
  }

  const infoButtons = () => {
    if (isAuthor) {
      return (
        <Link
          to="/editor"
          className="hub-info__author-button button button--simple"
        >
          <Icon id="puzzle-piece" width="22" />
          Открыть редактор
        </Link>
      );
    }

    return (
      <>
        <div className="hub-info__small-button-wrapper">
          <Link
            to="/player/:id/test"
            className="hub-info__button hub-info__button--outline button"
          >
            Тестирование
          </Link>
          <button
            type="button"
            className="hub-info__stats hub-info__button hub-info__button--outline button button--icon-only"
          >
            <Icon id="graph-bar" width="22" />
            <span className="visually-hidden">Статистика</span>
          </button>
        </div>
        <Link to="/player/:id/show" className="hub-info__button button">
          Пройти сценарий
        </Link>
      </>
    );
  };

  // const convertCreateTime = (date) => {
  //   const [year, month, day] = date.split("-");
  //   return `${day.slice(0, day.indexOf("T"))}.${month}.${year}`;
  // };

  return (
    <section className="hub-info">
      <h2 className="visually-hidden">Информация о сценарии</h2>
      <div className="hub-info__wrapper">
        <div className="hub-info__preview-wrapper">
          {/* <img src="" alt="Первый кадр сценария" /> */}
        </div>
        <div className="hub-info__content-wrapper">
          <h3 className="hub-info__title">{chosenScript.title}</h3>
          <dl className="hub-info__quality-list">
            <dt className="hub-info__quality-name">Описание</dt>
            <dd className="hub-info__description">
              {/* {chosenScript.description} */}
            </dd>
            <dt className="hub-info__quality-name">Дата создания</dt>
            <dd className="hub-info__origin-date">
              {/* {convertCreateTime(chosenScript.create_time)} */}
            </dd>
          </dl>
          <div className="hub-info__button-wrapper">{infoButtons()}</div>
        </div>
      </div>
    </section>
  );
});

export default Info;
