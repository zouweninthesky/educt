import { makeAutoObservable, toJS } from "mobx";
import Scripts from "./scripts";

import ScriptsApi from "../api/UserScriptService";
import { deepCopy } from "../utils/deepCopy";
import {
  calculateHeight,
  calculateTopLeft,
  calculateWidth,
} from "../utils/calculateMaskCoords";

const Api = ScriptsApi;

class Editor {
  //UID, createTime ISO, description, orgID, title
  scriptData = null;
  // // Передается из другого store (?), для отправки запроса к api
  scriptUID = null;
  // // Название и описания сценария, изменение чисто их работает отдельно, не триггерит общее
  // // "Сохранить и выйти" и сопутствующие предупреждения
  scriptTitle = null;
  scriptDescription = null;
  // Откуда будут браться степы для отображения и редактирования
  stepsOld = [];
  // Модифицированный объект шагов
  steps = [];
  // // Номер текущего степа, в него закидывается тот степ, который сейчас открыт из stepsOld
  currentStepNumber = 0;
  // Объекь текущего степа
  currentStepData = null;
  // // Массив удаленных степов, чисто их uid
  toDelete = [];
  // Массив измененных степов, они формируются из currentStep
  // masks добавляется к
  toUpdate = [];
  // Не уверен, что нужно
  loading = true;
  // Ошибка, думаю, все же нужна, но не уверен, как её
  error = null;
  // Состояние, когда пользователь все сохранил и ждет отправки всех запросов
  sending = false;
  // Счетчик для уникальных id масок
  lastMaskId = 0;
  // Показывается или нет дропдаун для выбора типа действия
  actionPickerVisible = false;
  // Загружено ли изображение, сбрасывается при переключении слайдов
  imageLoaded = false;

  mode = "overview";

  constructor() {
    makeAutoObservable(this);
  }

  setTitleDescription() {
    this.scriptTitle = this.scriptData.title;
    this.scriptDescription = this.scriptData.description;
  }

  resetStore() {
    this.scriptData = null;
    this.scriptUID = null;
    this.scriptTitle = null;
    this.scriptDescription = null;
    this.stepsOld = [];
    this.steps = [];
    this.currentStepNumber = 0;
    this.currentStepData = null;
    this.toDelete = [];
    this.toUpdate = [];
    this.loading = true;
    this.error = null;
    this.sending = false;
    this.lastMaskId = 0;
    this.actionPickerVisible = false;
  }

  async getSteps(scriptUID) {
    this.resetStore();
    this.scriptUID = scriptUID;
    this.scriptRequested();
    this.scriptData = await Api.getScript(this.scriptUID);
    this.stepsOld = this.scriptData.steps;
    this.steps = deepCopy(this.scriptData.steps);
    this.steps.forEach((step) => {
      step.masks = [];
      step.shrinkRatio = 1;
    });
    this.stepsOld.forEach((step) => {
      step.masks = [];
      step.shrinkRatio = 1;
    });
    this.currentStepNumber = 0;
    this.currentStepData = deepCopy(this.steps[this.currentStepNumber]);
    this.setTitleDescription();
    this.stepsLoaded();
  }

  scriptSet(uid) {
    this.scriptUID = uid;
  }

  scriptRequested() {
    this.loading = true;
  }

  stepsLoaded() {
    this.loading = false;
  }

  changeShrinkRatio(newVal) {
    this.currentStepData.shrinkRatio = newVal;
  }

  openStep(UID) {
    this.currentStepNumber = this.steps.findIndex((step) => step.UID === UID);
    this.currentStepData = deepCopy(this.steps[this.currentStepNumber]);
    this.startImageLoad();
    this.mode = "tools";
  }

  nextStep() {
    console.log(toJS(this));
    this.currentStepNumber++;
    this.startImageLoad();
    this.currentStepData = deepCopy(this.steps[this.currentStepNumber]);
  }

  prevStep() {
    this.currentStepNumber--;
    this.startImageLoad();
    this.currentStepData = deepCopy(this.steps[this.currentStepNumber]);
  }

  addMask(topLeft, bottomRight) {
    // console.log(toJS(this.currentStepData));
    this.currentStepData.masks.push({
      topLeft,
      bottomRight,
      id: this.lastMaskId,
    });
    this.lastMaskId++;
  }

  deleteMask(id) {
    const index = this.currentStepData.masks.findIndex((el) => el.id === id);
    this.currentStepData.masks.splice(index, 1);
  }

  saveStepToUpdate() {
    const stepNew = deepCopy(this.currentStepData);
    const index = this.toUpdate.findIndex((step) => step.UID === stepNew.UID);
    if (
      JSON.stringify(stepNew) !==
      JSON.stringify(
        toJS(this.stepsOld.find((step) => step.UID === stepNew.UID))
      )
    ) {
      if (index === -1) {
        this.toUpdate = deepCopy([...this.toUpdate, stepNew]);
      } else {
        const newToUpdate = deepCopy(this.toUpdate);
        newToUpdate[index] = stepNew;
        this.toUpdate = newToUpdate;
      }
    } else {
      if (index !== -1) {
        const newToUpdate = deepCopy(this.toUpdate);
        newToUpdate.splice(index, 1);
        this.toUpdate = newToUpdate;
      }
    }
  }

  saveStepMasks() {
    const stepNew = { ...this.currentStepData };
    stepNew.actionID = this.steps[this.currentStepNumber].actionID;
    stepNew.metaInfo = deepCopy(this.steps[this.currentStepNumber].metaInfo);
    this.steps[this.currentStepNumber] = deepCopy(stepNew);
    this.saveStepToUpdate();
  }

  cancelStepMasks() {
    console.log("cancel");
    this.currentStepData.masks = deepCopy(
      this.steps[this.currentStepNumber].masks
    );
  }

  repeatStepMasks() {
    console.log(this.currentStepData.shrinkRatio);
    const stepNew = deepCopy(this.currentStepData);
    stepNew.masks = deepCopy(this.steps[this.currentStepNumber - 1].masks);
    this.currentStepData = stepNew;
    console.log(this.currentStepData.shrinkRatio);
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

  setDefaultMode() {
    this.setMode("tools");
  }

  setActionMode() {
    this.setMode("action");
  }

  updateAction(firstPoint, secondPoint) {
    console.log("upd action", toJS(this.currentStepData));
    const step = deepCopy(this.currentStepData);
    step.metaInfo.boxCoords.upperLeft = calculateTopLeft(
      firstPoint,
      secondPoint
    );
    step.metaInfo.boxCoords.width = calculateWidth(firstPoint, secondPoint);
    step.metaInfo.boxCoords.height = calculateHeight(firstPoint, secondPoint);
    this.currentStepData = step;
    console.log("upd action", toJS(this.currentStepData));
  }

  saveStepAction() {
    this.steps[this.currentStepNumber] = deepCopy(this.currentStepData);
    this.saveStepToUpdate();
  }

  cancelStepAction() {
    console.log("cancel");
    this.currentStepData = deepCopy(this.steps[this.currentStepNumber]);
  }

  saveStepDescription(description) {
    this.currentStepData.description = description;
    this.steps[this.currentStepNumber] = deepCopy(this.currentStepData);
    this.saveStepToUpdate();
  }

  deleteStep() {
    this.toDelete = [...this.toDelete, this.currentStepData.UID];
    const stepsNew = deepCopy(this.steps);
    stepsNew.splice(this.currentStepNumber, 1);
    this.steps = stepsNew;
    if (this.currentStepNumber < this.steps.length - 1)
      this.currentStepNumber += 0;
    else this.currentStepNumber -= 1;
    this.currentStepData = this.steps[this.currentStepNumber];
  }

  setActionType(type_id) {
    const step = deepCopy(this.currentStepData);
    step.actionID = type_id;
    this.currentStepData = step;
  }

  showActionPicker() {
    this.actionPickerVisible = true;
  }

  hideActionPicker() {
    this.actionPickerVisible = false;
  }

  toggleActionPickerVisible() {
    this.actionPickerVisible = !this.actionPickerVisible;
  }

  changeTitle(title) {
    this.scriptTitle = title;
  }

  changeDescription(description) {
    this.scriptDescription = description;
  }

  async scriptTitleDescriptionUpdate() {
    await ScriptsApi.changeTitleDescriptionScript(
      this.scriptData.UID,
      this.scriptData.orgID,
      this.scriptTitle,
      this.scriptDescription
    );
    this.scriptData.title = this.scriptTitle;
    this.scriptData.description = this.scriptDescription;
  }

  async scriptUpdate() {
    await ScriptsApi.updateScript(this.scriptUID, this.toDelete, this.toUpdate);
  }

  startSending() {
    this.sending = true;
  }

  finishSending() {
    this.resetStore();
  }

  startImageLoad() {
    this.imageLoaded = false;
  }

  finishImageLoad() {
    this.imageLoaded = true;
  }
}

export default new Editor();
