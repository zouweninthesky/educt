import React from "react";
import { observer } from "mobx-react-lite";
import "./Notification.scss";

import Icon from "../Icon/Icon";

import MainStore from "../../../store";

import {
  ERROR_SERVER,
  ERROR_SERVER_CONTENT,
  SUCCESS_PERSONAL,
  SUCCESS_PERSONAL_CONTENT,
  SUCCESS_PASSWORD,
  SUCCESS_PASSWORD_CONTENT,
  ERROR_PASSWORD_OLD,
  ERROR_PASSWORD_OLD_CONTENT,
  // ERROR_PASSWORD,
  // ERROR_PASSWORD_CONTENT,
  ERROR_LOGIN_WRONG_CREDENTIALS,
  ERROR_LOGIN_WRONG_CREDENTIALS_CONTENT,
} from "../../../utils/constants/notificationStrings";

const Notification = observer(() => {
  if (MainStore.notification === null) return <></>;

  const content = () => {
    switch (MainStore.notification) {
      case ERROR_SERVER:
        return ERROR_SERVER_CONTENT;

      case SUCCESS_PERSONAL:
        return SUCCESS_PERSONAL_CONTENT;

      case SUCCESS_PASSWORD:
        return SUCCESS_PASSWORD_CONTENT;

      case ERROR_PASSWORD_OLD:
        return ERROR_PASSWORD_OLD_CONTENT;

      case ERROR_LOGIN_WRONG_CREDENTIALS:
        return ERROR_LOGIN_WRONG_CREDENTIALS_CONTENT;

      default:
        break;
    }
  };

  return (
    <div className="notification">
      <p className="notification__content">{content()}</p>
      <button
        type="button"
        className="notification__hide button button--icon-only"
        onClick={() => {
          MainStore.setNotification(null);
        }}
      >
        <Icon id="cancel" width="30" />
      </button>
    </div>
  );
});

export default Notification;
