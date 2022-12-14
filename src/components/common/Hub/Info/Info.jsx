import React from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import dateFormat from "dateformat";
import "./Info.scss";

import Icon from "../../Icon/Icon";

import Store from "../../../../store";
import ExamStore from "../../../../store/exam";
import PlayerStore from "../../../../store/player";
import Scripts from "../../../../store/scripts";
import { KEYBOARD_ENTER_BUTTON } from "../../../../utils/constants/keycodes";
import { MASK_DAY_MONTH_YEAR_DOTS } from "../../../../utils/constants/dateFormatMasks";
import {
  MAX_SYMBOLS_TITLE,
  MAX_SYMBOLS_DESCRIPTION,
} from "../../../../utils/constants/magicNumbers";

const Info = observer((props) => {
  const history = useHistory();

  const {
    chosenScript,
    chosenScriptTitle,
    chosenScriptOldTitle,
    chosenScriptDescription,
    chosenScriptOldDescription,
  } = Scripts;

  if (chosenScript === null) {
    return <></>;
  }

  const { isEditor } = props;

  const title = () => {
    if (isEditor) return chosenScriptTitle;

    return chosenScriptOldTitle ? chosenScriptOldTitle : "Нет названия";
  };

  const description = () => {
    if (isEditor) return chosenScriptDescription;

    return chosenScriptOldDescription
      ? chosenScriptOldDescription
      : "Нет названия";
  };

  const infoTitle = () => {
    if (isEditor) {
      return (
        <>
          <div
            className="hub-info__title hub-info__trick"
            data-replicated-value={title()}
          >
            <textarea
              rows="1"
              type="text"
              value={title()}
              className="hub-info__title"
              onChange={(e) => {
                if (e.target.value.length >= MAX_SYMBOLS_TITLE)
                  e.target.value = e.target.value.slice(0, MAX_SYMBOLS_TITLE);
                Scripts.changeTitle(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === KEYBOARD_ENTER_BUTTON) {
                  Scripts.scriptTitleDescriptionUpdate();
                  e.target.blur();
                }
              }}
            ></textarea>
          </div>
        </>
      );
    }

    return <h3 className="hub-info__title">{title()}</h3>;
  };

  const infoDescription = () => {
    if (isEditor) {
      return (
        <>
          <div
            className="hub-info__description hub-info__trick"
            data-replicated-value={description()}
          >
            <textarea
              rows="1"
              type="text"
              value={description()}
              onChange={(e) => {
                if (e.target.value.length >= MAX_SYMBOLS_DESCRIPTION)
                  e.target.value = e.target.value.slice(
                    0,
                    MAX_SYMBOLS_DESCRIPTION
                  );
                Scripts.changeDescription(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === KEYBOARD_ENTER_BUTTON) {
                  Scripts.scriptTitleDescriptionUpdate();
                  e.target.blur();
                }
              }}
            ></textarea>
          </div>
        </>
      );
    }

    return description();
  };

  const infoButtons = () => {
    if (isEditor) {
      return (
        <Link
          to={"/editor/" + chosenScript.UID}
          className="hub-info__author-button button button--simple"
          onClick={() => {
            Store.loadingStarted();
          }}
        >
          <Icon id="puzzle-piece" width="22" />
          Открыть редактор
        </Link>
      );
    }

    return (
      <>
        <div className="hub-info__small-button-wrapper">
          <button
            className="hub-info__button hub-info__button--outline button"
            type="button"
            onClick={async () => {
              Store.loadingStarted();
              history.push(`/exam/${chosenScript.UID}`);
            }}
            onTouchStart={() => {
              ExamStore.touchDetected();
              history.push("/exam");
            }}
            disabled={chosenScript.state === 1}
          >
            Тестирование
          </button>
          <button
            type="button"
            className="hub-info__stats hub-info__button hub-info__button--outline button button--icon-only"
            disabled
          >
            <Icon id="graph-bar" width="22" />
            <span className="visually-hidden">Статистика</span>
          </button>
        </div>

        <Link
          className="hub-info__button button"
          to={`/player/${chosenScript.UID}`}
          onClick={() => Store.loadingStarted()}
        >
          Пройти сценарий
        </Link>
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
