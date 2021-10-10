import { MAIN_URL } from "../utils/constants/links";

const headers = {
  Authorization: `Bearer ${window.localStorage.getItem("token")}`,
};

export default class UserScriptsService {
  async getUserScripts() {
    const response = await fetch(`${MAIN_URL}scripts/`, {
      method: "GET",
      headers,
    });

    const data = await response.json();
    return data;
  }

  async getScript(UID) {
    const response = await fetch(`${MAIN_URL}scripts/${UID}/`, {
      method: "GET",
      headers,
    });

    const data = await response.json();

    return data;
  }

  async deleteScript(UID) {
    await fetch(`${MAIN_URL}scripts/${UID}/`, {
      method: "DELETE",
      headers,
    });
  }

  async changeTitleDescriptionScript(UID, orgID, title, description) {
    const data = {
      UID,
      orgID,
      title,
      description,
    };

    await fetch(`${MAIN_URL}scripts/${UID}/`, {
      method: "PUT",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
}
