import Auth from "../store/auth";
import request from "./request";
import { MAIN_URL, SCRIPTS_PER_PAGE } from "../utils/constants/links";

const headers = {
  Authorization: `Bearer ${Auth.token}`,
};

class UserScriptsService {
  async getUserScripts(pageNumber) {
    const url = `${MAIN_URL}scripts/?page=${pageNumber}&perPage=${SCRIPTS_PER_PAGE}`;
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
    await request(url, config, true);
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

    await request(url, config, true);
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
