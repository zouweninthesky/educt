import { makeAutoObservable } from "mobx";

// import ScriptsApi from "../api/UserScriptsServiceFake";
import ScriptsApi from "../api/UserScriptService";
import Store from "./index";

const Api = new ScriptsApi();

class Scripts {
  scripts = [];
  chosenScript = null;
  scriptToDelete = "";

  constructor() {
    makeAutoObservable(this);
  }

  async scriptsLoad() {
    Store.loading = true;
    const data = await Api.getUserScripts();
    this.scripts = await data;
    Store.loading = false;
  }

  // scriptsRequested() {
  //   this.loading = true;
  // }

  // scriptsError(error) {
  //   this.scripts = [];
  //   this.loading = false;
  //   this.error = error;
  // }

  scriptChosen(id) {
    const [chosenScript] = this.scripts.filter((script) => script.UID === id);
    this.chosenScript = chosenScript;
  }

  scriptToDeleteChosen(id) {
    this.scriptToDelete = id;
  }

  async scriptDelete() {
    await Api.deleteScript(this.scriptToDelete);
    this.scriptsLoad();
  }
}

export default new Scripts();
