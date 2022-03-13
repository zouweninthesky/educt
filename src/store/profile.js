import { action, makeObservable, observable } from "mobx";
import Store from "./index";

import MainStore from "./index";
import ProfileService from "../api/ProfileService";
import ImageService from "../api/ImageService";

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
  avatarUid = "";
  newAvatar = "";
  personalChanged = false;
  // Добавить булку с "изменения внесены" и дизейблить с ней кнопку

  constructor() {
    makeObservable(this, {
      id: observable,
      firstName: observable,
      oldFirstName: observable,
      lastName: observable,
      oldLastName: observable,
      avatarUid: observable,
      newAvatar: observable,
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
    this.avatarUid = "";
    this.newAvatar = "";
    this.personalChanged = false;
  }

  async getUser() {
    this.resetStore();
    Store.loadingStarted();
    const data = await ProfileService.getUserData();
    this.id = data.id;
    this.setFirstLastName(data);
    this.avatarUid = data.avatarUid;
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

  async uploadPersonal() {
    // const data = {
    // firstName: this.firstName,
    // lastName: this.lastName,
    // };
    // if (this.newAvatar) {
    // data.avatarUid = this.avatarUid;
    // }

    const response = await ProfileService.changePersonalData(
      this.firstName,
      this.lastName,
      this.avatarUid
    );

    if (response.status) {
      return response.status;
    }
  }

  async saveAvatar(imageBlob) {
    this.newAvatar = imageBlob;
    this.personalChanged = true;
  }

  async uploadAvatar() {
    const avatarURL = await ImageService.getImageUploadLinks(1, true);

    this.avatarUid = avatarURL.urls[0].imageUid;

    const response = await ImageService.uploadImagesStorage(
      this.newAvatar,
      avatarURL.urls[0].url
    );

    if (response.status) {
      return response.status;
    }
  }

  async uploadProfile() {
    let responseString = 0;
    let responseImg = 0;
    if (this.newAvatar) {
      responseImg = await this.uploadAvatar();
    }
    if (this.personalChanged) {
      responseString = await this.uploadPersonal();
    }
    console.log(responseString);
    console.log(responseImg);
    console.log(responseImg + responseString);
    switch (responseString + responseImg) {
      case 200:
        MainStore.setNotification(SUCCESS_PERSONAL);
        break;
      case 400:
        MainStore.setNotification(SUCCESS_PERSONAL);
        break;
      case 700:
        MainStore.setNotification(ERROR_SERVER);
        break;
      case 1000:
        MainStore.setNotification(ERROR_SERVER);
        break;
    }
  }

  async changePassword(oldPassword, newPassword, repeatPassword) {
    const response = await ProfileService.changePassword(
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
