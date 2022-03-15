import { action, makeObservable, observable } from "mobx";

import Store from "./index";
import Api from "../api/ScriptsService";

class Player {
  script = undefined;
  imageLoaded = false;
  // used for evading cache-saving issues
  timeStamp = null;

  constructor() {
    makeObservable(this, {
      script: observable,
      imageLoaded: observable,
      timeStamp: observable,
      getScript: action,
      startImageLoad: action,
      finishImageLoad: action,
    });
  }

  resetStore() {
    this.script = undefined;
    this.imageLoaded = false;
    this.timeStamp = null;
  }

  async getScript(scriptUID) {
    this.resetStore();
    Store.loadingStarted();
    console.log(scriptUID);
    const data = await Api.getScript(scriptUID);
    // ЭТА СТРОКА ЛИШНЯЯ !!!
    this.script = await data;
    Store.loadingFinished();
    this.timeStamp = Date.now();
  }

  startImageLoad() {
    this.imageLoaded = false;
  }

  finishImageLoad() {
    this.imageLoaded = true;
  }

  async completeScript() {
    await Api.completeScript(this.script.UID, 2);
  }
}

export default new Player();
