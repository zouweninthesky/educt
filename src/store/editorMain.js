import { makeAutoObservable, toJS } from "mobx";

import ScriptsApi from "../api/UserScriptService";
// import { deepCopy } from "../utils/deepCopy";
// import {
//   calculateHeight,
//   calculateTopLeft,
//   calculateWidth,
// } from "../utils/calculateMaskCoords";

import GlobalStore from ".";
import EditorStepStore from "./editorStep";
import EditorMaskStore from "./editorMask";

class EditorMain {
  scriptUID = null;
  orgID = null;
  // // Название и описания сценария, изменение чисто их работает отдельно, не триггерит общее
  // // "Сохранить и выйти" и сопутствующие предупреждения
  scriptTitle = null;
  scriptDescription = null;
  // used for evading cache-saving issues
  timeStamp = null;
  // Нужно, чтобы дождаться загрузки данных, и при этом не скрыть канвас на этапе сохранения
  loading = true;
  // current menu mode
  mode = "overview";

  constructor() {
    makeAutoObservable(this);
  }

  setTitleDescription(data) {
    this.scriptTitle = data.title;
    this.scriptDescription = data.description;
  }

  resetStore() {
    this.scriptTitle = null;
    this.scriptDescription = null;
    this.sending = false;
    this.timeStamp = null;
    this.loading = true;
    EditorStepStore.resetStore();
    EditorMaskStore.resetStore();
  }

  // Скачивается все в этой функции, но сохраняется в EditorStep
  async getSteps(scriptUID) {
    this.resetStore();
    this.scriptUID = scriptUID;
    GlobalStore.loadingStarted();
    const scriptData = await ScriptsApi.getScript(this.scriptUID);
    this.orgID = scriptData.orgID;
    this.setTitleDescription(scriptData);
    EditorStepStore.initSteps(scriptData);
    this.timeStamp = Date.now();
    this.setTitleDescription(scriptData);
    this.loading = false;
    GlobalStore.loadingFinished();
  }

  setMode(mode) {
    this.mode = mode;
  }

  setMaskMode() {
    this.setMode("mask");
  }

  setOverviewMode() {
    this.setMode("overview");
  }

  // переписать на setToolsMode
  // setDefaultMode() {
  //   this.setMode("tools");
  // }

  setToolsMode() {
    this.setMode("tools");
  }

  setActionMode() {
    this.setMode("action");
  }

  changeTitle(title) {
    this.scriptTitle = title;
  }

  changeDescription(description) {
    this.scriptDescription = description;
  }

  async scriptTitleDescriptionUpdate() {
    await ScriptsApi.changeTitleDescriptionScript(
      this.scriptUID,
      this.orgID,
      this.scriptTitle,
      this.scriptDescription
    );
    // this.scriptData.title = this.scriptTitle;
    // this.scriptData.description = this.scriptDescription;
  }

  startSending() {
    GlobalStore.loadingStarted();
  }

  finishSending() {
    GlobalStore.loadingFinished();
    this.resetStore();
  }

  async scriptDelete() {
    await ScriptsApi.deleteScript(this.scriptUID);
  }

  async scriptUpdate() {
    await ScriptsApi.updateScript(
      this.scriptUID,
      EditorStepStore.toDelete,
      EditorStepStore.toUpdate
    );
  }
}

export default new EditorMain();
