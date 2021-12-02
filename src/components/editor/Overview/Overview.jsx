import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import "./Overview.scss";

import Icon from "../../common/Icon/Icon";
import Spinner from "../../common/Spinner/Spinner";

// import EditorStore from "../../../store/editor";
import EditorStepStore from "../../../store/editorStep";
import { useModal } from "../../common/Modal/ModalContext";
import { MODAL_SETTINGS_ID } from "../../../utils/constants/modals";
import Thumbnail from "../../../static/img/test/temp-slide-thumbnail.jpg";

const Overview = () => {
  const [, setModalID] = useModal();

  const {
    steps,
    toDelete,
    toUpdate,
    // toUpdateDescription,
    // toUpdateActionID,
    // toUpdateBoxCoords,
    // toUpdateText,
  } = EditorStepStore;

  const content = () => {
    if (steps && steps.length) {
      const stepsItems = steps.map((step, i) => {
        return (
          <li className="overview__item" key={step.UID}>
            <button
              className="overview__button"
              type="button"
              onClick={() => {
                EditorStepStore.openStep(step.UID);
              }}
            >
              <img src={Thumbnail} width="110" height="62" alt="thumbnail" />
              <h3 className="overview__title">{`Слайд ${i + 1}`}</h3>
            </button>
          </li>
        );
      });
      return <ul className="overview__list">{stepsItems}</ul>;
    } else {
      return (
        <>
          <Spinner show={true} />
        </>
      );
    }
  };

  const isChanged = () => {
    return toDelete.length !== 0 || toUpdate.length !== 0
      ? // toUpdateDescription.length !== 0 ||
        // toUpdateActionID.length !== 0 ||
        // toUpdateBoxCoords.length !== 0 ||
        // toUpdateText.length !== 0
        "Изменения внесены"
      : "";
  };

  return (
    <div className="overview">
      <div className="overview__item">
        <button
          className="overview__button"
          type="button"
          onClick={() => setModalID(MODAL_SETTINGS_ID)}
        >
          <Icon id="info" width="64" />
          <div>
            <h3 className="overview__title">Общие настройки</h3>
            <span className="overview__changes">{isChanged()}</span>
          </div>
        </button>
      </div>
      <Scrollbars
        renderTrackHorizontal={(props) => (
          <div {...props} className="overview__scroll" />
        )}
        // renderThumbHorizontal={(props) => (
        //   <div {...props} className="overview__scroll-thumb" />
        // )}
      >
        {content()}
      </Scrollbars>
    </div>
  );
};

export default Overview;
