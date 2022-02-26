import { action, makeObservable, observable } from "mobx";

class Store {
  loading = true;
  error = null;
  notification = null;

  constructor() {
    makeObservable(this, {
      loading: observable,
      error: observable,
      notification: observable,
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

  setNotification(code) {
    this.notification = code;
  }
}

export default new Store();
