import React from "react";

import Icon from "../../common/Icon/Icon";
import MainLogo from "../../../static/img/content/main-logo.svg";
import { useCloseModal } from "../CloseModal/CloseModalContext";
import FullScreenButton from "./FullScreenButton/FullScreenButton";

import "./Panel.scss";

const Panel = ({ slide, prevSlide, nextSlide, disablePrev, disableNext }) => {
  const [_, toggleClose] = useCloseModal();

  return (
    <section className="panel">
      <h2 className="visually-hidden">Панель управления</h2>
      <div className="panel__left-side">
        <button
          className="panel__button"
          type="button"
          onClick={() => toggleClose()}
        >
          <Icon id="#arrow-left" width="24" />
        </button>
        <img src={MainLogo} alt="Лого Educt" />
      </div>
      <div className="panel__center">
        <button
          type="button"
          className="panel__button"
          onClick={prevSlide}
          disabled={disablePrev}
        >
          <Icon id="#angle-left" width="24" />
        </button>
        <button
          type="button"
          className="panel__button"
          onClick={nextSlide}
          disabled={disableNext}
        >
          <Icon id="#angle-right" width="24" />
        </button>
        <div className="panel__text-wrapper">
          <p className="panel__text">{slide.description}</p>
        </div>
      </div>
      <div className="panel__right-side">
        <button type="button" className="panel__button">
          <Icon id="#volume" width="24" />
        </button>
        <button type="button" className="panel__button" disabled>
          <Icon id="#zoom" width="24" />
        </button>
        <FullScreenButton />
      </div>
    </section>
  );
};

export default Panel;
