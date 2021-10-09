import { makeAutoObservable } from "mobx";

// import ScriptsApi from "../api/UserScriptsServiceFake";
import ScriptsApi from "../api/UserScriptService";
import Store from "./index";

const Api = new ScriptsApi();

class Scripts {
  scripts = [];
  chosenScript = null;
  chosenScriptTitle = null;
  chosenScriptDescription = null;
  scriptToDelete = "";

  constructor() {
    makeAutoObservable(this);
  }

  // without this a warning popped up on each sciptsLoad
  scriptsSet(data) {
    this.scripts = data;
  }

  async scriptsLoad() {
    const data = await Api.getUserScripts();
    this.scriptsSet(data);
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
    this.chosenScriptTitle = chosenScript.title;
    this.chosenScriptDescription = chosenScript.description;
  }

  scriptToDeleteChosen(UID) {
    this.scriptToDelete = UID;
  }

  async scriptDelete() {
    await Api.deleteScript(this.scriptToDelete);
    this.scriptsLoad();
  }

  changeTitle(title) {
    this.chosenScriptTitle = title;
  }

  changeDescription(description) {
    this.chosenScriptDescription = description;
  }

  async scriptTitleDescriptionUpdate() {
    console.log(
      this.chosenScript.UID,
      this.chosenScriptTitle,
      this.chosenScriptDescription
    );
    await Api.changeTitleDescriptionScript(
      this.chosenScript.UID,
      this.chosenScriptTitle,
      this.chosenScriptDescription
    );
    // this.scriptsLoad();
  }
}

export default new Scripts();
