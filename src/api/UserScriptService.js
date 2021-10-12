import Auth from "../store/auth";
import scripts from "../store/scripts";
import request from "./request";
import { MAIN_URL } from "../utils/constants/links";

const headers = {
  Authorization: `Bearer ${Auth.token}`,
};

class UserScriptsService {
  async getUserScripts() {
    const url = `${MAIN_URL}scripts/?page=1&perPage=15`;
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Auth.token}`,
      },
    };
    return await request(url, config);
  }

  async getScript(UID) {
    const url = `${MAIN_URL}scripts/${UID}/`;
    const config = {
      method: "GET",
      headers,
    };
    return await request(url, config);
  }

  async deleteScript(UID) {
    const url = `${MAIN_URL}scripts/${UID}/`;
    const config = {
      method: "DELETE",
      headers,
    };
    return await request(url, config);
  }

  async changeTitleDescriptionScript(UID, orgID, title, description) {
    const url = `${MAIN_URL}scripts/${UID}/`;
    const config = {
      method: "PUT",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UID,
        orgID,
        title,
        description,
      }),
    };

    return await request(url, config);
  }

  // async getUserScripts() {
  //   const response = await fetch(`${MAIN_URL}scripts/?page=1&perPage=15`, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${Auth.token}`,
  //     },
  //   });

  // async getScript(UID) {
  //   const response = await fetch(`${MAIN_URL}scripts/${UID}/`, {
  //     method: "GET",
  //     headers,
  //   });

  //   const data = await response.json();

  //   return data;
  // }

  // async deleteScript(UID) {
  //   await fetch(`${MAIN_URL}scripts/${UID}/`, {
  //     method: "DELETE",
  //     headers,
  //   });
  // }

  // async changeTitleDescriptionScript(UID, orgID, title, description) {
  //   const data = {
  //     UID,
  //     orgID,
  //     title,
  //     description,
  //   };

  //   await fetch(`${MAIN_URL}scripts/${UID}/`, {
  //     method: "PUT",
  //     headers: {
  //       ...headers,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });
  // }
}

export default new UserScriptsService();
