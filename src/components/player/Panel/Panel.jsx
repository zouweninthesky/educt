import React from "react";
import "./Panel.scss";

import Icon from "../../common/Icon/Icon";
import FullScreenButton from "./FullScreenButton/FullScreenButton";

import { useModal } from "../../common/Modal/ModalContext";
import { MODAL_CLOSE_ID } from "../../../utils/constants/modals";

const Panel = ({ step, prevStep, nextStep, disablePrev, disableNext }) => {
  const [, setModalID] = useModal();

  return (
    <section className="panel">
      <h2 className="visually-hidden">Панель управления</h2>
      <div className="panel__left-side">
        <button
          className="panel__button button button--simple button--icon-only"
          type="button"
          onClick={() => setModalID(MODAL_CLOSE_ID)}
        >
          <Icon id="arrow-left" width="24" />
        </button>
        <Icon id="main-logo" width="122" height="28" className="panel__logo" />
      </div>
      <div className="panel__center">
        <button
          type="button"
          className="panel__button button button--simple button--icon-only"
          onClick={prevStep}
          disabled={disablePrev}
        >
          <Icon id="angle-left" width="24" />
        </button>
        <button
          type="button"
          className="panel__button button button--simple button--icon-only"
          onClick={nextStep}
          disabled={disableNext}
        >
          <Icon id="angle-right" width="24" />
        </button>
        <div className="panel__text-wrapper">
          <p className="panel__text">
            {step.description === "" ? "Нет описания" : step.description}
          </p>
        </div>
      </div>
      <div className="panel__right-side">
        <button
          type="button"
          className="panel__button button button--simple button--icon-only"
        >
          <Icon id="volume" width="24" />
        </button>
        <button
          type="button"
          className="panel__button button button--simple button--icon-only"
          disabled
        >
          <Icon id="zoom" width="24" />
        </button>
        <FullScreenButton />
      </div>
    </section>
  );
};

export default Panel;
