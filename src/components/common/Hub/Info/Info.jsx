import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import dateFormat from "dateformat";
import "./Info.scss";

import Icon from "../../Icon/Icon";

import Store from "../../../../store";
import Scripts from "../../../../store/scripts";
import PlayerStore from "../../../../store/player";
import { KEYBOARD_ENTER_BUTTON } from "../../../../utils/constants/keycodes";
import { MASK_DAY_MONTH_YEAR_DOTS } from "../../../../utils/constants/dateFormatMasks";

const Info = observer((props) => {
  const history = useHistory();

  const { chosenScript } = Scripts;

  const [chosenScriptTitle, setChosenScriptTitle] = useState(
    chosenScript?.title || "test"
  );

  const [chosenScriptDescription, setChosenScriptDescription] = useState(
    chosenScript?.description || "test"
  );

  if (chosenScript === null) {
    return <></>;
  }

  console.log(chosenScript.title);

  const { isAuthor } = props;

  const title = chosenScript.title ? chosenScriptTitle : "Нет названия";

  const description = chosenScript.description
    ? chosenScriptDescription
    : "Нет описания";

  const infoTitle = () => {
    if (isAuthor) {
      return (
        <input
          type="text"
          value={title}
          className="hub-info__title"
          onChange={(e) => {
            setChosenScriptTitle(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === KEYBOARD_ENTER_BUTTON) {
              Scripts.scriptTitleDescriptionUpdate(
                chosenScriptTitle,
                chosenScriptDescription
              );
              e.target.blur();
            }
          }}
        />
      );
    }

    return <h3 className="hub-info__title">{title}</h3>;
  };

  const infoDescription = () => {
    if (isAuthor) {
      return (
        <input
          type="text"
          value={description}
          onChange={(e) => {
            setChosenScriptDescription(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === KEYBOARD_ENTER_BUTTON) {
              Scripts.scriptTitleDescriptionUpdate(
                chosenScriptTitle,
                chosenScriptDescription
              );
              e.target.blur();
            }
          }}
        />
      );
    }

    return description;
  };

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

        <button
          to="/player/:id/show"
          className="hub-info__button button"
          type="button"
          onClick={async () => {
            Store.storeRequested();
            await PlayerStore.playerGetScript();
            history.push("/player");
          }}
        >
          Пройти сценарий
        </button>
      </>
    );
  };

  return (
    <section className="hub-info">
      <h2 className="visually-hidden">Информация о сценарии</h2>
      <div className="hub-info__wrapper">
        <div className="hub-info__preview-wrapper">
          {/* <img src="" alt="Первый кадр сценария" /> */}
        </div>
        <div className="hub-info__content-wrapper">
          {infoTitle()}
          <dl className="hub-info__quality-list">
            <dt className="hub-info__quality-name">Описание</dt>
            <dd className="hub-info__description">{infoDescription()}</dd>
            <dt className="hub-info__quality-name">Дата создания</dt>
            <dd className="hub-info__origin-date">
              {dateFormat(chosenScript.createTime, MASK_DAY_MONTH_YEAR_DOTS)}
            </dd>
          </dl>
          <div className="hub-info__button-wrapper">{infoButtons()}</div>
        </div>
      </div>
    </section>
  );
});

export default Info;
