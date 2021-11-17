import { makeObservable, observable, action, computed, toJS } from "mobx";

import Store from ".";
import Api from "../api/UserScriptService";
import Scripts from "./scripts";

class Exam {
  script = undefined;
  currentStepID = 0;
  // used to show/hide Spinner, covering step's image
  imageLoaded = false;
  // used for monitoring exam passing, is sent to server after finishing exam
  results = [];
  currentTime = 0;
  timePassed = 0;
  currentClicks = 0;
  currentSymbolsTyped = 0;
  // used for evading cache-saving issues
  timeStamp = null;
  wasTouched = false;

  constructor() {
    makeObservable(this, {
      script: observable,
      currentStepID: observable,
      imageLoaded: observable,
      results: observable,
      currentTime: observable,
      timePassed: observable,
      currentClicks: observable,
      currentSymbolsTyped: observable,
      timeStamp: observable,
      wasTouched: observable,
      currentStep: computed,

      resetStore: action,
      getScript: action,
      startImageLoad: action,
      finishImageLoad: action,
      clickRegistered: action,
      stepFinished: action,
      startTimeCount: action,
      finishTimeCount: action,
      symbolTyped: action,
      saveStepResults: action,
      finishExam: action,
      touchDetected: action,
    });
  }

  get currentStep() {
    // return null;
    console.log(toJS(this.script));
    return this.script?.steps[this.currentStepID];
  }

  resetStore() {
    this.script = undefined;
    this.currentStepID = 0;
    this.imageLoaded = false;
    this.results = [];
    this.currentTime = 0;
    this.timePassed = 0;
    this.currentClicks = 0;
    this.currentSymbolsTyped = 0;
    this.timeStamp = null;
    this.touchDetected = false;
  }

  async getScript(scriptUID) {
    this.resetStore();
    Store.loading = true;
    const data = await Api.getScript(scriptUID);
    this.script = await data;
    Store.loading = false;
    this.timeStamp = Date.now();
  }

  // show Spinner
  startImageLoad() {
    this.imageLoaded = false;
  }

  // hide Spinner
  finishImageLoad() {
    this.imageLoaded = true;
  }

  // возможно, можно убрать, просто заменив вызовы на тело
  clickRegistered() {
    this.currentClicks++;
  }

  // Вызывается внутри переключения шагов
  stepFinished() {
    this.saveStepResults();
    this.currentStepID++;
    this.startImageLoad();
  }

  // Нужно вызывать при закрытии интромодалки или сразу, если модалки нет
  startTimeCount() {
    this.currentTime = new Date();
  }

  finishTimeCount() {
    this.timePassed = new Date() - this.currentTime;
    this.currentTime = new Date();
  }

  symbolTyped() {
    this.currentSymbolsTyped++;
    console.log(this.currentSymbolsTyped);
  }

  // сохраняет объект процесса прохождения шага
  saveStepResults() {
    this.clickRegistered();
    this.finishTimeCount();
    const stepResults = {
      stepUID: this.script.steps[this.currentStepID].UID,
      timeSpent: this.timePassed,
      attemptsCount: this.currentClicks,
    };
    if (this.currentSymbolsTyped !== 0) {
      // will be enabled later
      // stepResults.symbols = this.currentSymbolsTyped;
      this.currentSymbolsTyped = 0;
    }
    console.log(stepResults);
    this.results.push(stepResults);
    this.currentClicks = 0;
  }

  async finishExam() {
    this.saveStepResults();
    await Api.completeScript(this.script.UID, 3, this.results);
  }

  touchDetected() {
    this.wasTouched = true;
  }
}

export default new Exam();
