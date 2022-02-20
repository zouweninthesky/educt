import { action, makeObservable, observable, ObservableMap } from "mobx";
import Store from "./index";

import Api from "../api/ProfileService";

class Profile {
  id = "";
  firstName = "";
  oldFirstName = "";
  lastName = "";
  oldLastName = "";
  personalChanged = false;
  // Добавить булку с "изменения внесены" и дизейблить с ней кнопку

  constructor() {
    makeObservable(this, {
      id: observable,
      firstName: observable,
      oldFirstName: observable,
      lastName: observable,
      oldLastName: observable,
      personalChanged: observable,
      resetStore: action,
      getUser: action,
    });
  }

  resetStore() {
    this.id = "";
    this.firstName = "";
    this.oldFirstName = "";
    this.lastName = "";
    this.oldLastName = "";
    this.personalChanged = false;
  }

  async getUser() {
    this.resetStore();
    Store.loadingStarted();
    const data = await Api.getUserData();
    this.id = data.id;
    this.setFirstLastName(data);
    Store.loadingFinished();
  }

  setFirstLastName(data) {
    this.firstName = data.first_name ? data.first_name.slice() : "Нет имени";
    this.oldFirstName = data.first_name.slice();
    this.lastName = data.last_name ? data.last_name.slice() : "Нет фамилии";
    this.oldLastName = data.last_name.slice();
  }

  changeFirstName(firstName) {
    this.firstName = firstName;
    if (firstName !== this.oldFirstName) {
      this.personalChanged = true;
    }
  }

  changeLastName(lastName) {
    this.lastName = lastName;
    if (lastName !== this.oldLastName) {
      this.personalChanged = true;
    }
  }

  updateFirstLastName() {
    Api.changePersonalData(this.firstName, this.lastName);
    this.getUser();
  }

  async changePassword(oldPassword, newPassword, repeatPassword) {
    Api.changePassword(oldPassword, newPassword, repeatPassword);
  }
}

export default new Profile();
