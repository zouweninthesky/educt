import { action, makeObservable, observable } from "mobx";

import GlobalStore from ".";
import EditorStepStore from "./editorStep";
import EditorMaskStore from "./editorMask";
import ScriptsApi from "../api/UserScriptService";

import {
  EDITOR_MODE_TOOLS,
  EDITOR_MODE_ACTION,
  EDITOR_MODE_MASK,
  EDITOR_MODE_OVERVIEW,
} from "../utils/constants/modes";

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
  mode = EDITOR_MODE_OVERVIEW;

  constructor() {
    makeObservable(this, {
      scriptUID: observable,
      orgID: observable,
      scriptTitle: observable,
      scriptDescription: observable,
      timeStamp: observable,
      loading: observable,
      mode: observable,
      setTitleDescription: action,
      resetStore: action,
      getSteps: action,
      setMode: action,
      setMaskMode: action,
      setOverviewMode: action,
      setToolsMode: action,
      setActionMode: action,
      changeTitle: action,
      changeDescription: action,
      scriptTitleDescriptionUpdate: action,
      startSending: action,
      finishSending: action,
      scriptDelete: action,
      scriptUpdate: action,
    });
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
    this.setMode(EDITOR_MODE_MASK);
  }

  setOverviewMode() {
    this.setMode(EDITOR_MODE_OVERVIEW);
  }

  setToolsMode() {
    this.setMode(EDITOR_MODE_TOOLS);
  }

  setActionMode() {
    this.setMode(EDITOR_MODE_ACTION);
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
    this.startSending();
    await ScriptsApi.updateScript(
      this.scriptUID,
      EditorStepStore.toDelete,
      EditorStepStore.toUpdate
    );
  }
}

export default new EditorMain();
