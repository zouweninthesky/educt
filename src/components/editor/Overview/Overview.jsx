import React from "react";

import { useModal } from "../../common/Modal/ModalContext";
import Icon from "../../common/Icon/Icon";
import Thumbnail from "../../../static/img/test/temp-slide-thumbnail.jpg";
import { MODAL_SETTINGS_ID } from "../../../utils/constants/modals";

import "./Overview.scss";

const Overview = () => {
  const [, setScriptID] = useModal();

  return (
    <div className="overview">
      <div className="overview__item">
        <button
          className="overview__button"
          type="button"
          onClick={() => setScriptID(MODAL_SETTINGS_ID)}
        >
          <Icon id="info" width="64" />
          <h3 className="overview__title">Общие настройки</h3>
        </button>
      </div>
      <ul className="overview__list">
        <li className="overview__item">
          <button className="overview__button" type="button">
            <img src={Thumbnail} width="110" height="62" alt="thumbnail" />
            <h3 className="overview__title">Слайд 1</h3>
          </button>
        </li>
        <li className="overview__item">
          <button className="overview__button" type="button">
            <img src={Thumbnail} width="110" height="62" alt="thumbnail" />
            <h3 className="overview__title">Слайд 2</h3>
          </button>
        </li>
        <li className="overview__item">
          <button className="overview__button" type="button">
            <img src={Thumbnail} width="110" height="62" alt="thumbnail" />
            <h3 className="overview__title">Слайд 3</h3>
          </button>
        </li>
        <li className="overview__item">
          <button className="overview__button" type="button">
            <img src={Thumbnail} width="110" height="62" alt="thumbnail" />
            <h3 className="overview__title">Слайд 4</h3>
          </button>
        </li>
        <li className="overview__item">
          <button className="overview__button" type="button">
            <img src={Thumbnail} width="110" height="62" alt="thumbnail" />
            <h3 className="overview__title">Слайд 5</h3>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Overview;
