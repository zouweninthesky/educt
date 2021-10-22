import React from "react";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router";
import dateFormat from "dateformat";
import "./ScriptItem.scss";

import Icon from "../../Icon/Icon";

import Store from "../../../../store";
import PlayerStore from "../../../../store/player";
import ScriptsStore from "../../../../store/scripts";
import { useModal } from "../../Modal/ModalContext";
import { MODAL_DELETE_SCRIPT_ID } from "../../../../utils/constants/modals";
import { MASK_DAY_MONTH_SHORT_YEAR_DOTS_HOUR_MINUTE } from "../../../../utils/constants/dateFormatMasks";

const ScriptItem = observer(({ id, title, createTime, isEditor }) => {
  const [, setModalID] = useModal();
  const history = useHistory();

  const deleteButton = () => {
    if (isEditor) {
      return (
        <button
          className="script-item__icon-button"
          type="button"
          onClick={() => {
            ScriptsStore.scriptToDeleteChosen(id);
            setModalID(MODAL_DELETE_SCRIPT_ID);
          }}
        >
          <Icon id="trash" width="20" />
        </button>
      );
    }
    return <></>;
  };

  const shownTitle = title
    ? title
    : `Новый сценарий от ${dateFormat(
        createTime,
        MASK_DAY_MONTH_SHORT_YEAR_DOTS_HOUR_MINUTE
      )}`;

  return (
    <li className="script-item" id={id.toString()}>
      <button
        className="script-item__button"
        type="button"
        onClick={() => {
          ScriptsStore.scriptChosen(id);
        }}
      >
        <span>{shownTitle}</span>
      </button>
      <button
        className="script-item__icon-button"
        to="/player/:id/show"
        onClick={async () => {
          ScriptsStore.scriptChosen(id);
          Store.storeRequested();
          await PlayerStore.playerGetScript();
          history.push("/player");
        }}
      >
        <Icon id="play" width="20" />
      </button>
      <button className="script-item__icon-button" type="button" disabled>
        <Icon id="graph-bar" width="20" />
      </button>
      {deleteButton()}
    </li>
  );
});

export default ScriptItem;
