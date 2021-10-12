import { makeAutoObservable } from "mobx";

import AuthApi from "../api/AuthService";

const Api = new AuthApi();

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
    makeAutoObservable(this);
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

  RefreshToken() {
    window.localStorage.clear();
  }
}

export default new Auth();
