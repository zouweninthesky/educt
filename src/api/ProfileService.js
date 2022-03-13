import Auth from "../store/auth";

import request from "./request";
import { MAIN_URL } from "../utils/constants/links";

const headers = {
  "Content-Type": "application/json",
};

class ProfileService {
  async getUserData() {
    const url = `${MAIN_URL}users/${Auth.id}`;
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Auth.token}`,
      },
    };
    return await request(url, config);
  }

  async changePersonalData(firstName, lastName, avatarUid) {
    console.log(firstName);
    console.log(lastName);
    console.log(avatarUid);
    const url = `${MAIN_URL}users/${Auth.id}/`;
    const config = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${Auth.token}`,
        ...headers,
      },
      body: JSON.stringify({
        firstName,
        lastName,
        avatarUid,
      }),
    };

    return await request(url, config, false, true);
  }

  async changePassword(oldPassword, password, confirmedPassword) {
    console.log(oldPassword);
    console.log(password);
    console.log(confirmedPassword);
    const url = `${MAIN_URL}users/${Auth.id}/password/`;
    const config = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${Auth.token}`,
        ...headers,
      },
      body: JSON.stringify({
        oldPassword: oldPassword,
        password: password,
        confirmedPassword: confirmedPassword,
      }),
    };

    return await request(url, config, false, true);
  }
}

export default new ProfileService();
