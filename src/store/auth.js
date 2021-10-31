import { action, makeObservable, observable, computed } from "mobx";

import Api from "../api/AuthService";

const hash = (string) => {
  // Does nothing, was discussed, will be changed
  return string;
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
      loading: observable,
      error: observable,
      SignIn: action,
      SignOut: action,
      RefreshToken: action,
    });
  }

  get isEditor() {
    if (window.localStorage.getItem("token")) {
      const token = window.localStorage.getItem("token");
      return JSON.parse(
        atob(token.slice(token.indexOf(".") + 1, token.lastIndexOf(".")))
      ).isEditor;
    }
    return null;
  }

  async SignIn(login, password) {
    this.loading = true;
    const response = await Api.SignIn(login, hash(password));
    this.loading = false;
    if (response.user) {
      this.token = response.access;
      this.refresh = response.refresh;
      window.localStorage.setItem("token", response.access);
      window.localStorage.setItem("refresh", response.refresh);
      this.error = null;
    } else {
      this.error = response.details;
    }
  }

  async SignOut() {
    this.loading = true;
    await Api.SignOut();
    window.localStorage.clear();
    this.token = null;
    this.refresh = null;
    this.loading = false;
  }

  async RefreshToken() {
    this.loading = true;
    this.token = null;
    window.localStorage.removeItem("token");
    const response = await Api.RefreshToken();
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
