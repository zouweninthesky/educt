import Auth from "../store/auth";
import request from "./request";
import { MAIN_URL, SCRIPTS_PER_PAGE } from "../utils/constants/links";
import { toJS } from "mobx";

const headers = {
  Authorization: `Bearer ${Auth.token}`,
};

const createStateParam = (state) => {
  if (state === null) return "";
  if (state === 3) return "&isPublished=false";
  return `&state=${state}`;
};

class UserScriptsService {
  async getUserScripts(pageNumber, state) {
    const url = `${MAIN_URL}scripts/?page=${pageNumber}&perPage=${SCRIPTS_PER_PAGE}${createStateParam(
      state
    )}`;
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

  async changeTitleDescriptionScript(uid, orgID, title, description) {
    const url = `${MAIN_URL}scripts/${uid}/`;
    const config = {
      method: "PUT",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid,
        orgID,
        title,
        description,
      }),
    };

    await request(url, config, true);
  }

  async completeScript(uid, state, stepStates) {
    const url = `${MAIN_URL}scripts/${uid}/states/`;
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

    await request(url, config, true);
  }

  async updateScript(scriptUID, toDelete, toUpdate) {
    // keeps only integer on boxSize and boxCoords

    const toUpdateParsed = toUpdate.map((step) => {
      step.metaInfo.boxCoords.upperLeft.x = parseInt(
        step.metaInfo.boxCoords.upperLeft.x
      );
      step.metaInfo.boxCoords.upperLeft.y = parseInt(
        step.metaInfo.boxCoords.upperLeft.y
      );
      step.metaInfo.boxCoords.width = parseInt(step.metaInfo.boxCoords.width);
      step.metaInfo.boxCoords.height = parseInt(step.metaInfo.boxCoords.height);
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

  async publishScript(UID) {
    const url = `${MAIN_URL}scripts/${UID}/publish/`;
    const config = {
      method: "POST",
      headers: {
        ...headers,
      },
    };

    await request(url, config, true);
  }
}

export default new UserScriptsService();
