import React from "react";

import MainLogo from "../../../static/img/content/main-logo.svg";
import { useCloseModal } from "../CloseModal/CloseModalContext";

import sprite from "../../../assets/sprite.svg";

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
          <svg width="24" height="24">
            <use href={sprite + "#icon-arrow-left"} />
          </svg>
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
          <svg width="24" height="24">
            <use href={sprite + "#icon-angle-left"} />
          </svg>
        </button>
        <button
          type="button"
          className="panel__button"
          onClick={nextSlide}
          disabled={disableNext}
        >
          <svg width="24" height="24">
            <use href={sprite + "#icon-angle-right"} />
          </svg>
        </button>
        <div className="panel__text-wrapper">
          <p className="panel__text">{slide.description}</p>
        </div>
      </div>
      <div className="panel__right-side">
        <button type="button" className="panel__button">
          <svg width="24" height="24">
            <use href={sprite + "#icon-volume"} />
          </svg>
        </button>
        <button type="button" className="panel__button">
          <svg width="24" height="24">
            <use href={sprite + "#icon-zoom"} />
          </svg>
        </button>
        <button type="button" className="panel__button">
          <svg width="24" height="24">
            <use href={sprite + "#icon-focus"} />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Panel;
