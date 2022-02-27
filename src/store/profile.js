import { action, makeObservable, observable } from "mobx";
import Store from "./index";

import Api from "../api/ProfileService";
import MainStore from "./index";

import {
  ERROR_SERVER,
  SUCCESS_PERSONAL,
  SUCCESS_PASSWORD,
  ERROR_PASSWORD,
} from "../utils/constants/notificationStrings";

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
    this.firstName = data.firstName ? data.firstName.slice() : "Нет имени";
    this.oldFirstName = data.firstName.slice();
    this.lastName = data.lastName ? data.lastName.slice() : "Нет фамилии";
    this.oldLastName = data.lastName.slice();
  }

  changeFirstName(firstName) {
    this.firstName = firstName;
    if (firstName !== this.oldFirstName) {
      this.personalChanged = true;
    } else {
      this.personalChanged = false;
    }
  }

  changeLastName(lastName) {
    this.lastName = lastName;
    if (lastName !== this.oldLastName) {
      this.personalChanged = true;
    } else {
      this.personalChanged = false;
    }
  }

  async updateFirstLastName() {
    const response = await Api.changePersonalData(
      this.firstName,
      this.lastName
    );
    console.log(response);
    if (response) {
      console.log(response.status);
      switch (response.status) {
        case 200:
          MainStore.setNotification(SUCCESS_PERSONAL);
          break;

        case 500:
          MainStore.setNotification(ERROR_SERVER);
          break;

        default:
          break;
      }
    }
    // this.getUser();
  }

  async changePassword(oldPassword, newPassword, repeatPassword) {
    const response = await Api.changePassword(
      oldPassword,
      newPassword,
      repeatPassword
    );
    console.log(response);
    if (response) {
      console.log(response.status);
      const data = await response.json();
      console.log(data);
      switch (response.status) {
        case 200:
          MainStore.setNotification(SUCCESS_PASSWORD);

          return true;

        case 500:
          MainStore.setNotification(ERROR_SERVER);
          break;

        default:
          break;
      }
    }
  }
}

export default new Profile();
