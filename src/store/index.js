import { makeAutoObservable } from "mobx";

import ScriptsApi from "../api/UserScriptsService";
// import ScriptsApi from "../api/UserScriptServiceNew";

const Api = new ScriptsApi();

class Scripts {
  scripts = [];
  chosenScript = null;
  loading = true;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  async scriptsLoad() {
    const data = await Api.getUserScripts();
    this.scripts = data;
    this.loading = false;
    this.error = null;
  }

  scriptsRequested() {
    this.loading = true;
  }

  scriptsError(error) {
    this.scripts = [];
    this.loading = false;
    this.error = error;
  }

  scriptChosen(id) {
    const [chosenScript] = this.scripts.filter((script) => script.uid === id);
    this.chosenScript = chosenScript;
  }
}

export default new Scripts();
