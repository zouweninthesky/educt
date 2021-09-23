import { makeAutoObservable } from "mobx";

// import scriptsApi from "../api/UserScriptsService";
import scriptsApi from "../api/UserScriptServiceNew";

// const Api = new scriptsApi();
const Api = new scriptsApi();

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
    const [chosenScipt] = this.scripts.filter((script) => script.uid === id);
    this.chosenScript = chosenScipt;
  }
}

export default new Scripts();
