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

  async changePersonalData(firstName, lastName) {
    console.log(firstName);
    console.log(lastName);
    const url = `${MAIN_URL}users/${Auth.id}/`;
    const config = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${Auth.token}`,
        ...headers,
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
      }),
    };

    return await request(url, config);
  }

  async changePassword(oldPassword, newPassword, repeatPassword) {
    console.log(oldPassword);
    console.log(newPassword);
    console.log(repeatPassword);
    const url = `${MAIN_URL}users/${Auth.id}/password/`;
    const config = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${Auth.token}`,
        ...headers,
      },
      body: JSON.stringify({
        old_password: oldPassword,
        password: newPassword,
        confirmed_password: repeatPassword,
      }),
    };

    return await request(url, config);
  }
}

export default new ProfileService();
