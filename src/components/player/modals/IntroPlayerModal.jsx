import React from "react";
import { toJS } from "mobx";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

import Icon from "../../common/Icon/Icon";
import Modal from "../../common/Modal/Modal";

import Store from "../../../store";
import PlayerStore from "../../../store/player";
import ExamStore from "../../../store/exam";
import { useModal } from "../../common/Modal/ModalContext";
import {
  createNumberStringMale,
  createNumberStringFemale,
} from "../../../utils/string-generators";
import { MODAL_INTRO_PLAYER_ID } from "../../../utils/constants/modals";

const IntroPlayerModal = ({ script }) => {
  const history = useHistory();
  const [modalID, setModalID] = useModal();

  if (modalID !== MODAL_INTRO_PLAYER_ID) {
    return <></>;
  }

  const stepString = createNumberStringMale(script.steps.length, "слайд");
  const title = script.title || "Нет названия";
  const description = script.description || "Нет описания";
  const minuteString = createNumberStringFemale(
    Math.ceil(script.steps.length / 4),
    "минут"
  );

  console.log(toJS(script));

  return (
    <Modal modifier="wide">
      <h2 className="modal__header">{title}</h2>
      <div className="modal__info-wrapper">
        <div className="modal__description">
          <p>{description}</p>
          {/* <p>Режим тестирования станет доступен после обычного прохождения.</p> */}
        </div>
        <div className="modal__info">
          <p>{stepString}</p>
          <p>{minuteString}</p>
        </div>
      </div>
      <div className="modal__button-wrapper modal__button-wrapper--big">
        <button
          className="modal__big-button modal__big-button--start"
          onClick={() => setModalID()}
        >
          <Icon id="play" width="40" />
          <span>Начать</span>
        </button>
        <button
          className="modal__big-button modal__big-button--test"
          onClick={async () => {
            Store.loadingStarted();
            PlayerStore.resetStore();
            history.push(`/exam/${script.UID}`);
          }}
          onTouchStart={() => {
            ExamStore.touchDetected();
            PlayerStore.resetStore();
            history.push(`/exam/${script.UID}`);
          }}
          disabled={script.state === 1}
        >
          <Icon id="graduation" width="40" />
          <span>Тестирование</span>
        </button>
        <Link
          to="/user"
          className="modal__big-button modal__big-button--return"
          onClick={() => setModalID()}
        >
          <Icon id="arrow-left" width="40" />
          <span>Вернуться</span>
        </Link>
      </div>
    </Modal>
  );
};

export default IntroPlayerModal;
