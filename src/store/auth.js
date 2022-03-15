import { action, makeObservable, observable, computed } from "mobx";

import MainStore from "./index";
import Api from "../api/AuthService";

import {
  ERROR_SERVER,
  ERROR_LOGIN_WRONG_CREDENTIALS,
} from "../utils/constants/notificationStrings";

const hash = (string) => {
  // Does nothing, was discussed, will be changed
  return string;
};

const getUserInfoFromToken = () => {
  const token = window.localStorage.getItem("token");

  return JSON.parse(
    atob(token.slice(token.indexOf(".") + 1, token.lastIndexOf(".")))
  );
};

class Auth {
  token = window.localStorage.getItem("token") || null;
  refresh = window.localStorage.getItem("refresh") || null;
  loading = false;
  error = "";

  constructor() {
    makeObservable(this, {
      token: observable,
      refresh: observable,
      isEditor: computed,
      id: computed,
      loading: observable,
      error: observable,
      signIn: action,
      signOut: action,
      refreshToken: action,
    });
  }

  get isEditor() {
    if (window.localStorage.getItem("token")) {
      return getUserInfoFromToken().isEditor;
    }
    return null;
  }

  get id() {
    if (window.localStorage.getItem("token")) {
      return getUserInfoFromToken().userID;
    }
    return null;
  }

  async signIn(login, password) {
    this.loading = true;
    const response = await Api.signIn(login, hash(password));
    console.log(response);
    this.loading = false;

    switch (response.status) {
      case 200:
        const data = await response.json();
        this.token = data.access;
        this.refresh = data.refresh;
        window.localStorage.setItem("token", data.access);
        window.localStorage.setItem("refresh", data.refresh);
        this.error = null;
        break;

      case 401:
        MainStore.setNotification(ERROR_LOGIN_WRONG_CREDENTIALS);

      case 500:
        MainStore.setNotification(ERROR_SERVER);
    }
  }

  async signOut() {
    this.loading = true;
    // await Api.SignOut();
    window.localStorage.clear();
    this.token = null;
    this.refresh = null;
    this.loading = false;
  }

  async refreshToken() {
    this.loading = true;
    this.token = null;
    window.localStorage.removeItem("token");
    const response = await Api.refreshToken();
    if (response.access) {
      this.token = response.access;
      window.localStorage.setItem("token", response.access);
    } else {
      window.localStorage.clear();
      this.refresh = null;
      this.error = response.details;
    }
    this.loading = false;
  }
}

export default new Auth();
