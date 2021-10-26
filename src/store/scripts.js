import { makeAutoObservable } from "mobx";

// import ScriptsService from "../utils/UserScriptsServiceFake";
// import AuthService from "../api/AuthService";
import ScriptsService from "../api/UserScriptService";
import Store from "./index";
import { SCRIPTS_PER_PAGE } from "../utils/constants/links";

class Scripts {
  scripts = null;
  chosenScript = null;
  chosenScriptTitle = null;
  chosenScriptDescription = null;
  chosenScriptOldTitle = null;
  chosenScriptOldDescription = null;
  pagesLoaded = 1;
  allLoaded = false;
  scriptToDelete = "";

  constructor() {
    makeAutoObservable(this);
  }

  // without this a warning popped up on each sciptsLoad
  scriptsSet(data) {
    if (this.scripts === null) {
      this.scripts = [];
    }
    this.scripts = [...this.scripts, ...data];
  }

  scriptsClear() {
    this.scripts = null;
    this.pagesLoaded = 1;
    this.allLoaded = false;
  }

  async scriptsLoad() {
    Store.storeRequested();
    const response = await ScriptsService.getUserScripts(this.pagesLoaded);

    if (response.length) {
      this.scriptsSet(response);
      this.pagesLoaded++;
      Store.storeLoaded();
      if (this.scripts.length % SCRIPTS_PER_PAGE !== 0) {
        this.allLoaded = true;
      }
    } else if (response.length === 0) {
      this.allLoaded = true;
    } else {
      this.scriptsSet([]);
      Store.storeError();
    }

    this.scriptsSet([]);
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
    this.chosenScriptTitle = chosenScript.title
      ? chosenScript.title.slice()
      : "Добавьте название";
    this.chosenScriptOldTitle = chosenScript.title.slice();
    this.chosenScriptDescription = chosenScript.description
      ? chosenScript.description.slice()
      : "Добавьте описание";
    this.chosenScriptOldDescription = chosenScript.description.slice();
  }

  scriptToDeleteChosen(UID) {
    this.scriptToDelete = UID;
  }

  async scriptDelete() {
    await ScriptsService.deleteScript(this.scriptToDelete);
    this.updateShownScripts();
  }

  changeTitle(title) {
    this.chosenScriptTitle = title;
  }

  changeDescription(description) {
    this.chosenScriptDescription = description;
  }

  async scriptTitleDescriptionUpdate() {
    await ScriptsService.changeTitleDescriptionScript(
      this.chosenScript.UID,
      this.chosenScript.orgID,
      this.chosenScriptTitle,
      this.chosenScriptDescription
    );
    this.chosenScriptOldTitle = this.chosenScriptTitle.slice();
    this.chosenScriptOldDescription = this.chosenScriptDescription.slice();
    this.updateShownScripts();
  }

  async updateShownScripts() {
    const oldPagesLoaded = this.pagesLoaded;
    this.scriptsClear();
    for (let i = 0; i < oldPagesLoaded; i++) {
      await this.scriptsLoad();
    }
  }
}

export default new Scripts();
