import { makeAutoObservable } from "mobx";

class Store {
  loading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  loadingStarted() {
    this.loading = true;
  }

  loadingFinished() {
    this.loading = false;
  }

  errorOccured() {
    this.error = true;
  }
}

export default new Store();
