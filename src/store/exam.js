import { makeAutoObservable } from "mobx";

import Store from ".";
import Api from "../api/UserScriptService";
import Scripts from "./scripts";

class Exam {
  script = undefined;
  imageLoaded = false;
  // used for evading cache-saving issues
  timeStamp = null;

  constructor() {
    makeAutoObservable(this);
  }

  resetStore() {
    this.script = undefined;
    this.imageLoaded = false;
    this.timeStamp = null;
  }

  async getScript() {
    this.resetStore();
    Store.loading = true;
    const data = await Api.getScript(Scripts.chosenScript.UID);
    this.script = await data;
    Store.loading = false;
    this.timeStamp = Date.now();
  }

  startImageLoad() {
    this.imageLoaded = false;
  }

  finishImageLoad() {
    this.imageLoaded = true;
  }
}

export default new Exam();
