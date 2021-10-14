import React from "react";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router";
import "./ScriptItem.scss";

import Icon from "../../Icon/Icon";

import Store from "../../../../store";
import PlayerStore from "../../../../store/player";
import ScriptsStore from "../../../../store/scripts";
import { useModal } from "../../Modal/ModalContext";
import { MODAL_DELETE_SCRIPT_ID } from "../../../../utils/constants/modals";

const ScriptItem = observer(({ id, title, isAuthor }) => {
  const [, setModalID] = useModal();
  const history = useHistory();

  const deleteButton = () => {
    if (isAuthor) {
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

  return (
    <li className="script-item" id={id.toString()}>
      <button
        className="script-item__button"
        type="button"
        onClick={() => {
          ScriptsStore.scriptChosen(id);
        }}
      >
        <span>{title}</span>
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
      <button className="script-item__icon-button" type="button">
        <Icon id="graph-bar" width="20" />
      </button>
      {deleteButton()}
    </li>
  );
});

export default ScriptItem;
