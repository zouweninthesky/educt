import { makeAutoObservable } from "mobx";

import Store from "../store";
import Api from "../api/UserScriptService";
import Scripts from "./scripts";

class Player {
  script = undefined;
  imageLoaded = false;
  // used for evading cache-saving issues
  timeStamp = null;

  constructor() {
    makeAutoObservable(this);
  }

  async playerGetScript() {
    Store.loading = true;
    console.log(Scripts.chosenScript.UID);
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

export default new Player();
