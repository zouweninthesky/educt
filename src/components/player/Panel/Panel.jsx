import React from "react";
import "./Panel.scss";

import Icon from "../../common/Icon/Icon";
import FullScreenButton from "./FullScreenButton/FullScreenButton";

import { useModal } from "../../common/Modal/ModalContext";
import { MODAL_CLOSE_ID } from "../../../utils/constants/modals";
import MainLogo from "../../../static/img/content/main-logo.svg";

const Panel = ({ step, prevStep, nextStep, disablePrev, disableNext }) => {
  const [, setModalID] = useModal();

  return (
    <section className="panel">
      <h2 className="visually-hidden">Панель управления</h2>
      <div className="panel__left-side">
        <button
          className="panel__button"
          type="button"
          onClick={() => setModalID(MODAL_CLOSE_ID)}
        >
          <Icon id="arrow-left" width="24" />
        </button>
        <img src={MainLogo} alt="Лого Educt" />
      </div>
      <div className="panel__center">
        <button
          type="button"
          className="panel__button"
          onClick={prevStep}
          disabled={disablePrev}
        >
          <Icon id="angle-left" width="24" />
        </button>
        <button
          type="button"
          className="panel__button"
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
        <button type="button" className="panel__button">
          <Icon id="volume" width="24" />
        </button>
        <button type="button" className="panel__button" disabled>
          <Icon id="zoom" width="24" />
        </button>
        <FullScreenButton />
      </div>
    </section>
  );
};

export default Panel;
