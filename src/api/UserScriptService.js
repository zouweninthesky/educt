import Auth from "../store/auth";
import request from "./request";
import { MAIN_URL, SCRIPTS_PER_PAGE } from "../utils/constants/links";
import { toJS } from "mobx";

const headers = {
  Authorization: `Bearer ${Auth.token}`,
};

class UserScriptsService {
  async getUserScripts(pageNumber, state) {
    const stateParam = state === null ? "" : `&state=${state}`;

    const url = `${MAIN_URL}scripts/?page=${pageNumber}&perPage=${SCRIPTS_PER_PAGE}${stateParam}`;
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

  async completeScript(UID, state, stepStates) {
    const url = `${MAIN_URL}scripts/${UID}/states/`;
    const body = {
      state,
    };
    if (stepStates) {
      body.stepStates = stepStates;
    }
    const config = {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    console.log(body);

    await request(url, config, true);
  }

  async updateScript(scriptUID, toDelete, toUpdate) {
    const toUpdateParsed = toUpdate.map((step) => {
      step.metaInfo.boxCoords.upperLeft.x = parseInt(
        step.metaInfo.boxCoords.upperLeft.x
      );
      step.metaInfo.boxCoords.upperLeft.y = parseInt(
        step.metaInfo.boxCoords.upperLeft.y
      );
      step.metaInfo.boxCoords.width = parseInt(step.metaInfo.boxCoords.width);
      step.metaInfo.boxCoords.height = parseInt(step.metaInfo.boxCoords.height);
      console.log(toJS(step));
      return step;
    });

    const url = `${MAIN_URL}steps/`;
    const config = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${Auth.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        scriptUID,
        toDelete,
        toUpdate: toUpdateParsed,
      }),
    };

    await request(url, config, true);
  }
}

export default new UserScriptsService();
