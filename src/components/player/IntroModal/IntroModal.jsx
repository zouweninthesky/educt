import React from "react";
import { Link } from "react-router-dom";

import sprite from "../../../assets/sprite.svg";

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
          <button className="modal-intro__button" onClick={() => introHide()}>
            <svg width="40" height="40">
              <use href={sprite + "#icon-play"}></use>
            </svg>
            <span>Начать</span>
          </button>
          <button className="modal-intro__button">
            <svg width="40" height="40">
              <use href={sprite + "#icon-graph-bar"}></use>
            </svg>
            <span>Тестирование</span>
          </button>
          <Link to="/user" className="modal-intro__button">
            <svg width="40" height="40">
              <use href={sprite + "#icon-arrow-left"}></use>
            </svg>
            <span>Вернуться</span>
          </Link>
        </div>
      </div>
      <div className="overlay"></div>
    </>
  );
};

export default IntroModal;
