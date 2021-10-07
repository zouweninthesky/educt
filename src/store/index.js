import { makeAutoObservable } from "mobx";

class Store {
  loading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  storeRequested() {
    this.loading = true;
  }

  // async scriptsLoad() {
  //   const data = await Api.getUserScripts();
  //   this.scripts = await data;
  //   this.loading = false;
  //   this.error = null;
  // }

  // scriptsRequested() {
  //   this.loading = true;
  // }

  // scriptsError(error) {
  //   this.scripts = [];
  //   this.loading = false;
  //   this.error = error;
  // }

  // scriptChosen(id) {
  //   const [chosenScript] = this.scripts.filter((script) => script.UID === id);
  //   this.chosenScript = chosenScript;
  // }
}

export default new Store();
