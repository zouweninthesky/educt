import { makeAutoObservable } from "mobx";

import Store from "../store";
import Api from "../api/UserScriptService";
import Scripts from "./scripts";

class Player {
  script = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  async playerGetScript() {
    Store.loading = true;
    const data = await Api.getScript(Scripts.chosenScript.UID);
    this.script = await data;
    Store.loading = false;
  }
}

export default new Player();
