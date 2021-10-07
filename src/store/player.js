import { makeAutoObservable } from "mobx";

import Store from "../store";
import ScriptsApi from "../api/UserScriptService";
import Scripts from "./scripts";

const Api = new ScriptsApi();

class Player {
  script = {};

  constructor() {
    makeAutoObservable(this);
  }

  async playerGetScript() {
    Store.loading = true;
    const data = await Api.getScript(Scripts.chosenScript.UID);
    this.script = await data;
    // Store.loading = false;
  }

  // async scriptsLoad() {
  //   const data = await Api.getUserScripts();
  //   this.scripts = await data;
  //   this.loading = false;
  //   this.error = null;
  // }
  // stepsSet(uid) {
  //   this.scriptID = uid;
  // }
  // stepsRequested() {
  //   this.loading = true;
  // }
  // scriptLoad() {
  //   const data = await Api.getUserScripts();
  //   this.scriptOld.title = data.title;
  //   this.scriptOld.description = data.description;
  //   this.stepsOld = data.steps;
  // }
  // // Пользователь нажимает "сохранить" - сравнивается со старым
  // // стейтом,
  // // Должна быть проверка - изменены или нет. Не знаю, может,
  // // снаружи.
  // scriptTitleDescriptionChange(title, description) {}
}

export default new Player();
