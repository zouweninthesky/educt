import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import CloseModal from "./modals/CloseModal";
import { useModal } from "../common/Modal/ModalContext";
import IntroModal from "./modals/IntroModal";
import Panel from "./Panel/Panel";
import ProgressBar from "./ProgressBar/ProgressBar";
import Viewbox from "../common/Viewbox/Viewbox";
import Overlay from "../common/Modal/Overlay";
import PlayerStore from "../../store/player";
import {
  MODAL_INTRO_ID,
  MODAL_FINISH_PLAY_ID,
} from "../../utils/constants/modals";

import "./Player.scss";
import FinishPlayModal from "./modals/FinishPlayModal";

const Player = () => {
  const state = {
    currentStepId: 0,
    disablePrev: true,
    disableNext: false,
    isLastStep: false,
  };

  const [playerState, setPlayerState] = useState(state);

  const nextStep = () => {
    const stepsNumber = PlayerStore.script.steps.length;
    const block = playerState.currentStepId === stepsNumber - 2;

    if (block) {
      setPlayerState((prev) => ({
        currentStepId: prev.currentStepId + 1,
        disableNext: true,
        disablePrev: false,
        isLastStep: true,
      }));
    } else {
      setPlayerState((prev) => ({
        currentStepId: prev.currentStepId + 1,
        disablePrev: false,
      }));
    }
  };

  const prevStep = () => {
    const block = playerState.currentStepId === 1;

    if (block) {
      setPlayerState((prev) => ({
        currentStepId: prev.currentStepId - 1,
        disablePrev: true,
        disableNext: false,
      }));
    } else {
      setPlayerState((prev) => ({
        currentStepId: prev.currentStepId - 1,
        disableNext: false,
        isLastStep: false,
      }));
    }
  };

  const { currentStepId, disablePrev, disableNext, isLastStep } = playerState;
  const [, setModalID] = useModal();

  useEffect(() => {
    setModalID(MODAL_INTRO_ID);
  }, []);

  if (PlayerStore.script === undefined) {
    return <Redirect to="/user" />;
  }

  const currentStep = PlayerStore.script.steps[currentStepId];

  const actionClick = isLastStep ? setModalID(MODAL_FINISH_PLAY_ID) : nextStep;

  return (
    <main className="player">
      <Viewbox
        step={currentStep}
        actionClick={actionClick}
        isLastStep={isLastStep}
      />
      <Panel
        step={currentStep}
        prevStep={prevStep}
        nextStep={nextStep}
        disablePrev={disablePrev}
        disableNext={disableNext}
      />
      <ProgressBar
        current={currentStepId}
        total={PlayerStore.script.steps.length}
      />
      <CloseModal />
      <IntroModal script={PlayerStore.script} />
      <FinishPlayModal />
      <Overlay />
    </main>
  );
};

export default Player;
