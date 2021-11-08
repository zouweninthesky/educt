import React from "react";
import "./Panel.scss";

import Icon from "../../Icon/Icon";
import FullScreenButton from "./FullScreenButton/FullScreenButton";

import PlayerStore from "../../../../store/player";
import { useModal } from "../../Modal/ModalContext";
import {
  MODAL_CLOSE_ID,
  MODAL_FINISH_PLAY_ID,
} from "../../../../utils/constants/modals";

const Panel = ({
  step,
  prevStep,
  nextStep,
  disablePrev,
  isLastStep,
  isExam,
}) => {
  const [, setModalID] = useModal();

  const nextButton = () => {
    if (isLastStep) {
      return (
        <button
          type="button"
          className="panel__button button button--simple button--icon-only"
          onClick={async () => {
            await PlayerStore.completeScript();
            setModalID(MODAL_FINISH_PLAY_ID);
          }}
        >
          <Icon id="accept" width="24" />
        </button>
      );
    }

    return (
      <button
        type="button"
        className="panel__button button button--simple button--icon-only"
        onClick={nextStep}
      >
        <Icon id="angle-right" width="24" />
      </button>
    );
  };

  const navButtons = () => {
    if (isExam) return <></>;

    return (
      <>
        <button
          type="button"
          className="panel__button button button--simple button--icon-only"
          onClick={prevStep}
          disabled={disablePrev}
        >
          <Icon id="angle-left" width="24" />
        </button>
        {nextButton()}
      </>
    );
  };

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
        {navButtons()}
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
