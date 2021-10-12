import Auth from "../store/Auth";
import { MAIN_URL } from "../utils/constants/links";

const headers = {
  Authorization: `Bearer ${Auth.token}`,
};

export default class UserScriptsService {
  async getUserScripts() {
    const response = await fetch(`${MAIN_URL}scripts/?page=1&perPage=15`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Auth.token}`,
      },
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
