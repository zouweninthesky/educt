import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";

import CloseModal from "./modals/CloseModal";
import { useModal } from "../common/Modal/ModalContext";
import IntroModal from "./modals/IntroModal";
import Panel from "./Panel/Panel";
import ProgressBar from "./ProgressBar/ProgressBar";
import Viewbox from "../common/Viewbox/Viewbox";
import Scripts from "../../store/";
import Overlay from "../common/Modal/Overlay";
import PlayerStore from "../../store/player";
import { MODAL_INTRO_ID } from "../../utils/constants/modals";

import "./Player.scss";

const Player = () => {
  const state = {
    currentSlideId: 0,
    disablePrev: true,
    disableNext: false,
  };

  const [playerState, setPlayerState] = useState(state);

  const nextSlide = () => {
    const slidesNumber = PlayerStore.script.steps.length;
    const block = playerState.currentSlideId === slidesNumber - 2;

    if (block) {
      setPlayerState((prev) => ({
        currentSlideId: prev.currentSlideId + 1,
        disableNext: true,
        disablePrev: false,
      }));
    } else {
      setPlayerState((prev) => ({
        currentSlideId: prev.currentSlideId + 1,
        disablePrev: false,
      }));
    }
  };

  const prevSlide = () => {
    const block = playerState.currentSlideId === 1;

    if (block) {
      setPlayerState((prev) => ({
        currentSlideId: prev.currentSlideId - 1,
        disablePrev: true,
        disableNext: false,
      }));
    } else {
      setPlayerState((prev) => ({
        currentSlideId: prev.currentSlideId - 1,
        disableNext: false,
      }));
    }
  };

  const { currentSlideId, disablePrev, disableNext } = playerState;
  const [, setModalID] = useModal();

  useEffect(() => {
    setModalID(MODAL_INTRO_ID);
  }, []);

  if (PlayerStore.script === undefined) {
    return <Redirect to="/user" />;
  }

  const currentSlide = PlayerStore.script.steps[currentSlideId];

  return (
    <main className="player">
      <Viewbox slide={currentSlide} actionClick={nextSlide} />
      <Panel
        slide={currentSlide}
        prevSlide={prevSlide}
        nextSlide={nextSlide}
        disablePrev={disablePrev}
        disableNext={disableNext}
      />
      <ProgressBar
        current={currentSlideId}
        total={PlayerStore.script.steps.length}
      />
      <CloseModal />
      <IntroModal script={PlayerStore.script} />
      <Overlay />
    </main>
  );
};

export default Player;
