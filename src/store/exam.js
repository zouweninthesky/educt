import { makeAutoObservable } from "mobx";

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
  // used for evading cache-saving issues
  timeStamp = null;

  constructor() {
    makeAutoObservable(this);
  }

  resetStore() {
    this.script = undefined;
    this.currentStepID = 0;
    this.imageLoaded = false;
    this.results = [];
    this.currentTime = 0;
    this.timePassed = 0;
    this.currentClicks = 0;
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
  }

  // Нужно вызывать при закрытии интромодалки или сразу, если модалки нет
  startTimeCount() {
    this.currentTime = new Date();
  }

  finishTimeCount() {
    this.timePassed = new Date() - this.currentTime;
    this.currentTime = new Date();
  }

  // сохраняет объект процесса прохождения шага
  saveStepResults() {
    this.clickRegistered();
    this.finishTimeCount();
    const stepResults = {
      UID: this.script.steps[this.currentStepID].UID,
      time: this.timePassed,
      clicks: this.currentClicks,
    };
    console.log(stepResults);
    this.results.push(stepResults);
    this.currentClicks = 0;
  }

  async finishExam() {
    this.saveStepResults();
    // написать отправку на результатов
  }
}

export default new Exam();
