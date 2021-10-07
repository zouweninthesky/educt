import React from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import Scripts from "../../../../store/scripts";
import Icon from "../../Icon/Icon";

import "./ScriptItem.scss";

const ScriptItem = observer((props) => {
  return (
    <li className="script-item" id={props.id.toString()}>
      <button
        className="script-item__button"
        type="button"
        onClick={() => Scripts.scriptChosen(props.id)}
      >
        <span>{props.title}</span>
      </button>
      <Link
        className="script-item__icon-button"
        to="/player/:id/show"
        onClick={() => Scripts.scriptChosen(props.id)}
      >
        <Icon id="play" width="20" />
      </Link>
      <button className="script-item__icon-button" type="button">
        <Icon id="graph-bar" width="20" />
      </button>
    </li>
  );
});

export default ScriptItem;
