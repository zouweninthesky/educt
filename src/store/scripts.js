import { action, makeObservable, observable } from "mobx";

// import ScriptsService from "../utils/UserScriptsServiceFake";
// import AuthService from "../api/AuthService";
import ScriptsService from "../api/ScriptsService";
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
  stateFilterID = 0;
  filterOptions = [
    { id: 0, title: "Все сценарии", state: null },
    { id: 1, title: "Новое", state: 1 },
    { id: 2, title: "На тестирование", state: 2 },
  ];

  constructor() {
    makeObservable(this, {
      scripts: observable,
      chosenScript: observable,
      chosenScriptTitle: observable,
      chosenScriptDescription: observable,
      chosenScriptOldTitle: observable,
      chosenScriptOldDescription: observable,
      pagesLoaded: observable,
      allLoaded: observable,
      scriptToDelete: observable,
      scriptsSet: action,
      scriptsClear: action,
      scriptsLoad: action,
      scriptChosen: action,
      scriptToDeleteChosen: action,
      scriptDelete: action,
      changeTitle: action,
      changeDescription: action,
      scriptTitleDescriptionUpdate: action,
      updateShownScripts: action,
    });
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
    Store.loadingStarted();
    const response = await ScriptsService.getUserScripts(
      this.pagesLoaded,
      this.filterOptions[this.stateFilterID].state
    );

    if (response.length) {
      this.scriptsSet(response);
      this.pagesLoaded++;
      Store.loadingFinished();
      if (this.scripts.length % SCRIPTS_PER_PAGE !== 0) {
        this.allLoaded = true;
      }
    } else if (response.length === 0) {
      this.allLoaded = true;
      Store.loadingFinished();
    } else {
      this.scriptsSet([]);
      Store.loadingFinished();
      Store.errorOccured();
    }

    Store.loadingFinished();
    this.scriptsSet([]);
  }

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

  async applyStateFilter(state) {
    if (this.stateFilterID !== state) {
      this.stateFilterID = state;
      this.scriptsClear();
      await this.scriptsLoad();
    }
  }
}

export default new Scripts();
