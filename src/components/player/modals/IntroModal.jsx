import React from "react";
import { Link } from "react-router-dom";

import Icon from "../../common/Icon/Icon";
import Modal from "../../common/Modal/Modal";
import { useModal } from "../../common/Modal/ModalContext";
import {
  createNumberStringMale,
  createNumberStringFemale,
} from "../../../utils/string-generators";

const IntroModal = ({ script }) => {
  const [modalID, setModalID] = useModal();

  if (modalID !== "intro") {
    return <></>;
  }

  const slideString = createNumberStringMale(script.slides.length, "слайд");
  const minuteString = createNumberStringFemale(script.timeLength, "минут");

  return (
    <Modal modifier="wide">
      <h2 className="modal__header">{script.title}</h2>
      <div className="modal__info-wrapper">
        <div className="modal__description">
          <p>{script.description}</p>
          <p>Режим тестирования стнет доступен после обычного прохождения.</p>
        </div>
        <div className="modal__info">
          <p>{slideString}</p>
          <p>&gt; {minuteString}</p>
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
        <button className="modal__big-button modal__big-button--test">
          <Icon id="graduation" width="40" />
          <span>Тестирование</span>
        </button>
        <Link
          to="/user"
          className="modal__big-button modal__big-button--return"
        >
          <Icon id="arrow-left" width="40" />
          <span>Вернуться</span>
        </Link>
      </div>
    </Modal>
  );
};

export default IntroModal;
