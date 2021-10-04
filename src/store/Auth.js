import { makeAutoObservable } from "mobx";
import AuthApi from "../api/AuthService";
// import routing from "./routing";

const Api = new AuthApi();

const hash = (string) => {
  // Does nothing, need to discuss
  return string;
};

class Auth {
  token = window.localStorage.getItem("token") || null;
  loading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  async SignIn(login, password) {
    this.loading = true;
    const tokenData = await Api.SignIn(login, hash(password));
    this.loading = false;
    if (tokenData.user) {
      this.token = tokenData.access;
      window.localStorage.setItem("token", tokenData.access);
      // routing.push("/user");
    } else {
      this.error = tokenData.details;
    }
  }

  async SignOut() {
    this.loading = true;
    await Api.SignOut();
    window.localStorage.clear();
    this.loading = false;
    // routing.push("/login");
  }

  RefreshToken() {
    window.localStorage.clear();
    // routing.push("/login");
  }
}

export default new Auth();
