import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import "./Player.scss";

import Panel from "../common/walkthrough/Panel/Panel";
import ProgressBar from "../common/walkthrough/ProgressBar/ProgressBar";
import Viewbox from "../common/Viewbox/Viewbox";
import Overlay from "../common/Modal/Overlay";
import CloseModal from "../common/Modal/common modals/CloseModal";
import FinishPlayModal from "./modals/FinishPlayModal";
import IntroPlayerModal from "./modals/IntroPlayerModal";
import Loader from "../common/Loader/Loader";

import Store from "../../store";
import PlayerStore from "../../store/player";
import { useModal } from "../common/Modal/ModalContext";
import {
  MODAL_INTRO_PLAYER_ID,
  MODAL_FINISH_PLAY_ID,
} from "../../utils/constants/modals";

const Player = observer(({ scriptUID }) => {
  const state = {
    currentStepId: 0,
    disablePrev: true,
    isLastStep: false,
  };

  const [, setModalID] = useModal();
  const [playerState, setPlayerState] = useState(state);

  useEffect(() => {
    (async () => {
      await PlayerStore.getScript(scriptUID);
      setModalID(MODAL_INTRO_PLAYER_ID);

      if (PlayerStore.script.steps.length === 1) {
        setPlayerState((prev) => ({ ...prev, isLastStep: true }));
      }
    })();
  }, [scriptUID]);

  if (Store.loading) return <Loader />;

  const nextStep = () => {
    const stepsNumber = PlayerStore.script.steps.length;
    const block = playerState.currentStepId === stepsNumber - 2;
    PlayerStore.startImageLoad();
    if (block) {
      setPlayerState((prev) => ({
        currentStepId: prev.currentStepId + 1,
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
    PlayerStore.startImageLoad();
    if (block) {
      setPlayerState((prev) => ({
        currentStepId: prev.currentStepId - 1,
        disablePrev: true,
      }));
    } else {
      setPlayerState((prev) => ({
        currentStepId: prev.currentStepId - 1,
        isLastStep: false,
      }));
    }
  };

  const { currentStepId, disablePrev, isLastStep } = playerState;

  const currentStep = PlayerStore.script.steps[currentStepId];

  const actionClick = () => {
    if (isLastStep) {
      return async () => {
        await PlayerStore.completeScript();
        setModalID(MODAL_FINISH_PLAY_ID);
      };
    }

    return () => {
      nextStep();
    };
  };

  return (
    <main className="player">
      <Viewbox step={currentStep} actionClick={actionClick()} />
      <Panel
        step={currentStep}
        prevStep={prevStep}
        nextStep={nextStep}
        disablePrev={disablePrev}
        isLastStep={isLastStep}
      />
      <ProgressBar
        current={currentStepId}
        total={PlayerStore.script.steps.length}
      />
      <CloseModal />
      <IntroPlayerModal script={PlayerStore.script} />
      <FinishPlayModal script={PlayerStore.script} />
      <Overlay />
    </main>
  );
});

export default Player;
