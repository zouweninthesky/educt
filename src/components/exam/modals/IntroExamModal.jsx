import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

import Icon from "../../common/Icon/Icon";
import Modal from "../../common/Modal/Modal";

import PlayerStore from "../../../store/player";
import ExamStore from "../../../store/exam";
import { useModal } from "../../common/Modal/ModalContext";
import {
  createNumberStringFemale,
  createNumberStringMale,
} from "../../../utils/string-generators";
import { MODAL_INTRO_EXAM_ID } from "../../../utils/constants/modals";

const IntroExamModal = () => {
  const history = useHistory();
  const [modalID, setModalID] = useModal();

  if (modalID !== MODAL_INTRO_EXAM_ID) {
    return <></>;
  }

  const { script } = ExamStore;

  const stepString = createNumberStringMale(script.steps.length, "слайд");
  const title = script.title || "Нет названия";
  const description = script.description || "Нет описания";
  const minuteString = createNumberStringFemale(
    Math.ceil(script.steps.length / 4),
    "минут"
  );

  return (
    <Modal modifier="wide">
      <h2 className="modal__header">{title}</h2>
      <div className="modal__info-wrapper">
        <div className="modal__description">
          <p>{description}</p>
          <button
            className="modal__description-link"
            type="button"
            onClick={async () => {
              await PlayerStore.getScript();
              history.push("/player");
            }}
          >
            Потренироваться в режиме обучения
          </button>
        </div>
        <div className="modal__info">
          <p>{stepString}</p>
          <p>{minuteString}</p>
        </div>
      </div>
      <div className="modal__button-wrapper modal__button-wrapper--big">
        <button
          className="modal__big-button modal__big-button--test"
          onClick={() => {
            ExamStore.startTimeCount();
            setModalID();
          }}
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

export default IntroExamModal;
