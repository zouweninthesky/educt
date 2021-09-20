import React from "react";
import { Link } from "react-router-dom";

import Icon from "../../common/Icon/Icon";
import {
  createNumberStringMale,
  createNumberStringFemale,
} from "../../../utils/string-generators";

import "./IntroModal.scss";

const IntroModal = ({ script, introShown, introHide }) => {
  if (!introShown) {
    return <></>;
  }

  const slideString = createNumberStringMale(script.slides.length, "слайд");
  const minuteString = createNumberStringFemale(script.timeLength, "минут");

  return (
    <>
      <div className="modal-intro">
        <h2 className="modal-intro__title">{script.title}</h2>
        <div className="modal-intro__info-wrapper">
          <div className="modal-intro__description">
            <p>{script.description}</p>
            <p>Режим тестирования стнет доступен после обычного прохождения.</p>
          </div>
          <div className="modal-intro__info">
            <p>{slideString}</p>
            <p>&gt; {minuteString}</p>
          </div>
        </div>
        <div className="modal-intro__button-wrapper">
          <button
            className="modal-intro__button modal-intro__button--start"
            onClick={() => introHide()}
          >
            <Icon id="play" width="40" />
            <span>Начать</span>
          </button>
          <button className="modal-intro__button modal-intro__button--test">
            <Icon id="graduation" width="40" />
            <span>Тестирование</span>
          </button>
          <Link
            to="/user"
            className="modal-intro__button modal-intro__button--return"
          >
            <Icon id="arrow-left" width="40" />
            <span>Вернуться</span>
          </Link>
        </div>
      </div>
      <div className="overlay"></div>
    </>
  );
};

export default IntroModal;
