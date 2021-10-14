import { makeAutoObservable } from "mobx";

import Api from "../api/AuthService";

const hash = (string) => {
  // Does nothing, was discussed, will be changed
  return string;
};

class Auth {
  token = window.localStorage.getItem("token") || null;
  refresh = window.localStorage.getItem("refresh") || null;
  isAuthor = null;
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
      this.isAuthor = response.isAuthor;
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
    this.isAuthor = null;
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
