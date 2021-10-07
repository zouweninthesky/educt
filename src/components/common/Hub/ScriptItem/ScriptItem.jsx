import React from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import { useModal } from "../../Modal/ModalContext";
import Scripts from "../../../../store/scripts";
import Icon from "../../Icon/Icon";
import { MODAL_DELETE_SCRIPT_ID } from "../../../../utils/constants/modals";

import "./ScriptItem.scss";

const ScriptItem = observer(({ id, title, isAuthor }) => {
  const [, setModalID] = useModal();

  const deleteButton = () => {
    if (isAuthor) {
      return (
        <button
          className="script-item__icon-button"
          type="button"
          onClick={() => {
            // console.log(2222)
            Scripts.scriptToDeleteChosen(id);
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
        onClick={() => Scripts.scriptChosen(id)}
      >
        <span>{title}</span>
      </button>
      <Link
        className="script-item__icon-button"
        to="/player/:id/show"
        onClick={() => Scripts.scriptChosen(id)}
      >
        <Icon id="play" width="20" />
      </Link>
      <button className="script-item__icon-button" type="button">
        <Icon id="graph-bar" width="20" />
      </button>
      {deleteButton()}
    </li>
  );
});

export default ScriptItem;
