import { action, makeObservable, observable } from "mobx";

class Store {
  loading = true;
  error = null;

  constructor() {
    makeObservable(this, {
      loading: observable,
      error: observable,
      loadingStarted: action,
      loadingFinished: observable,
      errorOccured: observable,
    });
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
