import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import "./Player.scss";

import Panel from "./Panel/Panel";
import ProgressBar from "./ProgressBar/ProgressBar";
import Viewbox from "../common/Viewbox/Viewbox";
import Overlay from "../common/Modal/Overlay";
import CloseModal from "./modals/CloseModal";
import FinishPlayModal from "./modals/FinishPlayModal";
import IntroModal from "./modals/IntroModal";

import PlayerStore from "../../store/player";
import { useModal } from "../common/Modal/ModalContext";
import {
  MODAL_INTRO_ID,
  MODAL_FINISH_PLAY_ID,
} from "../../utils/constants/modals";

const Player = () => {
  const state = {
    currentStepId: 0,
    disablePrev: true,
    disableNext: false,
    isLastStep: false,
  };
  console.log(1111);
  console.log(PlayerStore.script);

  const [, setModalID] = useModal();
  const [playerState, setPlayerState] = useState(state);

  useEffect(() => {
    if (PlayerStore.script) {
      setModalID(MODAL_INTRO_ID);
    }
  }, []);

  if (PlayerStore.script === undefined) {
    return <Redirect to="/user" />;
  }

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

  const currentStep = PlayerStore.script.steps[currentStepId];

  const actionClick = isLastStep
    ? setModalID.bind(null, MODAL_FINISH_PLAY_ID)
    : nextStep;

  return (
    <main className="player">
      <Viewbox step={currentStep} actionClick={actionClick} />
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
