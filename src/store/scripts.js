import { makeAutoObservable } from "mobx";

// import ScriptsService from "../api/UserScriptsServiceFake";
// import AuthService from "../api/AuthService";
import ScriptsService from "../api/UserScriptService";
import Store from "./index";
import Auth from "./auth";
import { TOKEN_EXPIRED } from "../utils/constants/errorCodes";

class Scripts {
  scripts = [];
  chosenScript = null;
  // chosenScriptTitle = null;
  // chosenScriptDescription = null;
  scriptToDelete = "";

  constructor() {
    makeAutoObservable(this);
  }

  // without this a warning popped up on each sciptsLoad
  scriptsSet(data) {
    this.scripts = [...this.scripts, ...data];
  }

  async scriptsLoad(pageNumber) {
    Store.storeRequested();
    const response = await ScriptsService.getUserScripts(pageNumber);

    if (response.length) {
      this.scriptsSet(response);
      Store.storeLoaded();
    }

    // refresh attempt
    else {
      if (response.code === TOKEN_EXPIRED) {
        Auth.RefreshToken();
        const secondResponse = await ScriptsService.getUserScripts();
        if (response.length) {
          this.scriptsSet(secondResponse);
          Store.storeLoaded();
        }
      }

      this.scriptsSet([]);
      Store.storeError();
    }
  }

  // scriptsRequested() {
  //   this.loading = true;
  // }

  // scriptsError(error) {
  //   this.scripts = [];
  //   this.loading = false;
  //   this.error = error;
  // }

  scriptChosen(UID) {
    const [chosenScript] = this.scripts.filter((script) => script.UID === UID);
    this.chosenScript = chosenScript;
  }

  scriptToDeleteChosen(UID) {
    this.scriptToDelete = UID;
  }

  async scriptDelete() {
    await ScriptsService.deleteScript(this.scriptToDelete);
    this.scriptsLoad();
  }

  async scriptTitleDescriptionUpdate(title, description) {
    await ScriptsService.changeTitleDescriptionScript(
      this.chosenScript.UID,
      this.chosenScript.orgID,
      title,
      description
    );
    this.scriptsLoad();
  }
}

export default new Scripts();
