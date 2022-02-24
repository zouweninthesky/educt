import { action, makeObservable, toJS, observable } from "mobx";

import ScriptsApi from "../api/ScriptsService";
import { deepCopy } from "../utils/deepCopy";
import {
  calculateHeight,
  calculateTopLeft,
  calculateWidth,
} from "../utils/calculateMaskCoords";

import EditorMain from "./editorMain";
import EditorMask from "./editorMask";

class EditorStep {
  // Откуда будут браться степы для отображения и редактирования
  stepsOld = [];
  // Модифицированный объект шагов
  steps = [];
  // // Номер текущего степа, в него закидывается тот степ, который сейчас открыт из stepsOld
  currentStepNumber = 0;
  // Объекь текущего степа - хотим сделать computed
  currentStepData = null;
  // // Массив удаленных степов, чисто их uid
  toDelete = [];
  // Массив измененных степов, они формируются из currentStep
  // masks добавляется к
  toUpdate = [];
  // 4 массива, в которые закидываются изменения по шагам. В конце все склеивается в toUpdate и отправляется через put
  // toUpdateDescription = [];
  // toUpdateActionID = [];
  // toUpdateBoxCoords = [];
  // toUpdateText = [];
  // Показывается или нет дропдаун для выбора типа действия
  actionPickerVisible = false;
  // Загружено ли изображение, сбрасывается при переключении слайдов
  imageLoaded = false;

  constructor() {
    makeObservable(this, {
      stepsOld: observable,
      steps: observable,
      currentStepNumber: observable,
      toDelete: observable,
      toUpdate: observable,
      actionPickerVisible: observable,
      imageLoaded: observable,
      resetStore: action,
      initSteps: action,
      saveStepDescription: action,
      changeShrinkRatio: action,
      openStep: action,
      nextStep: action,
      prevStep: action,
      saveStepToUpdate: action,
      updateAction: action,
      saveStepAction: action,
      cancelStepAction: action,
      deleteStep: action,
      setActionType: action,
      showActionPicker: action,
      hideActionPicker: action,
      toggleActionPickerVisible: action,
      scriptUpdate: action,
      startImageLoad: action,
      finishImageLoad: action,
      // resetMasks: action,
    });
  }

  resetStore() {
    this.stepsOld = [];
    this.steps = [];
    this.currentStepNumber = 0;
    this.currentStepData = null;
    this.toDelete = [];
    this.toUpdate = [];
    // this.toUpdateDescription = [];
    // this.toUpdateActionID = [];
    // this.toUpdateBoxCoords = [];
    // this.toUpdateText = [];
    this.actionPickerVisible = false;
    this.imageLoaded = false;
  }

  initSteps(data) {
    this.stepsOld = data.steps;
    this.steps = deepCopy(data.steps);
    this.steps.forEach((step) => {
      step.masks = [];
      step.shrinkRatio = 1;
    });
    this.stepsOld.forEach((step) => {
      step.masks = [];
      step.shrinkRatio = 1;
    });
    this.currentStepData = deepCopy(this.steps[this.currentStepNumber]);
  }

  // // сохраняет описание шага
  // saveStepDescription(description) {
  //   if (this.currentStepData.description !== description) {
  //     this.currentStepData.description = description;
  //     this.steps[this.currentStepNumber] = deepCopy(this.currentStepData);
  //     this.addToUpdateDescription(description);
  //   }
  // }

  //TEMP
  saveStepDescription(description) {
    this.currentStepData.description = description;
    this.steps[this.currentStepNumber] = deepCopy(this.currentStepData);
    this.saveStepToUpdate();
  }

  saveStepDescriptionImage() {
    this.currentStepData.metaInfo.imageUIDs = ["added"];
    this.steps[this.currentStepNumber] = deepCopy(this.currentStepData);
    this.saveStepToUpdate();
  }

  // // добавляет изменения в массив toUpdateDescription
  // addToUpdateDescription(description) {
  //   const oldIndex = this.stepsOld.findIndex(
  //     (step) => step.UID === this.currentStepData.UID
  //   );
  //   if (this.stepsOld[oldIndex].description !== description) {
  //     const newObject = {
  //       UID: this.currentStepData.UID,
  //       description,
  //     };
  //     const index = this.toUpdateDescription.findIndex(
  //       (step) => step.UID === newObject.UID
  //     );
  //     if (index === -1) this.toUpdateDescription.push(newObject);
  //     else this.toUpdateDescription[index] = { ...newObject };
  //   } else {
  //     const index = this.toUpdateDescription.findIndex(
  //       (step) => step.UID === this.currentStepData.UID
  //     );
  //     if (index !== -1)
  //       this.toUpdateDescription = [
  //         ...this.toUpdateDescription.splice(0, index),
  //         ...this.toUpdateDescription.splice(index + 1),
  //       ];
  //   }
  // }

  // // сохраняет тип действия шага, и удаляет шаг из toUpdateText, если тип действия более не 2
  // saveStepActionID(actionID) {
  //   if (this.currentStepData.actionID !== actionID) {
  //     if (this.currentStepData.actionID === 2) {
  //       const index = this.toUpdateText.findIndex(
  //         (step) => step.UID === this.currentStepData.UID
  //       );
  //       if (index !== -1)
  //         this.toUpdateText = [
  //           ...this.toUpdateText.splice(0, index),
  //           ...this.toUpdateText.splice(index + 1),
  //         ];
  //     }
  //     this.currentStepData.actionID = actionID;
  //     this.steps[this.currentStepNumber] = deepCopy(this.currentStepData);
  //     this.addToUpdateActionID(actionID);
  //   }
  // }

  // // добавляет изменения в массив toUpdateActionID
  // addToUpdateActionID(actionID) {
  //   const oldIndex = this.stepsOld.findIndex(
  //     (step) => step.UID === this.currentStepData.UID
  //   );
  //   if (this.stepsOld[oldIndex].actionID !== actionID) {
  //     const newObject = {
  //       UID: this.currentStepData.UID,
  //       actionID,
  //     };
  //     const index = this.toUpdateActionID.findIndex(
  //       (step) => step.UID === newObject.UID
  //     );
  //     if (index === -1) this.toUpdateActionID.push(newObject);
  //     else this.toUpdateActionID[index] = { ...newObject };
  //   } else {
  //     const index = this.toUpdateActionID.findIndex(
  //       (step) => step.UID === this.currentStepData.UID
  //     );
  //     if (index !== -1)
  //       this.toUpdateActionID = [
  //         ...this.toUpdateActionID.splice(0, index),
  //         ...this.toUpdateActionID.splice(index + 1),
  //       ];
  //   }
  // }

  // // сохраняет текст шага
  // saveStepText(text) {
  //   if (this.currentStepData.metaInfo.text !== text) {
  //     this.currentStepData.metaInfo.text = text;
  //     this.steps[this.currentStepNumber] = deepCopy(this.currentStepData);
  //     this.addToUpdateText(text);
  //   }
  // }

  // // добавляет изменения в массив toUpdateText
  // addToUpdateText(text) {
  //   const oldIndex = this.stepsOld.findIndex(
  //     (step) => step.UID === this.currentStepData.UID
  //   );
  //   if (this.stepsOld[oldIndex].metaInfo.text !== text) {
  //     const newObject = {
  //       UID: this.currentStepData.UID,
  //       metaInfo: {
  //         text,
  //       },
  //     };
  //     const index = this.toUpdateText.findIndex(
  //       (step) => step.UID === newObject.UID
  //     );
  //     if (index === -1) this.toUpdateText.push(newObject);
  //     else this.toUpdateText[index] = { ...newObject };
  //   } else {
  //     const index = this.toUpdateText.findIndex(
  //       (step) => step.UID === this.currentStepData.UID
  //     );
  //     if (index !== -1)
  //       this.toUpdateText = [
  //         ...this.toUpdateText.splice(0, index),
  //         ...this.toUpdateText.splice(index + 1),
  //       ];
  //   }
  // }

  changeShrinkRatio(newVal) {
    this.currentStepData.shrinkRatio = newVal;
  }

  openStep(UID) {
    this.currentStepNumber = this.steps.findIndex((step) => step.UID === UID);
    this.currentStepData = deepCopy(this.steps[this.currentStepNumber]);
    this.startImageLoad();
    EditorMask.showOldMasks();
    EditorMain.setToolsMode();
  }

  nextStep() {
    this.currentStepNumber++;
    this.startImageLoad();
    this.currentStepData = deepCopy(this.steps[this.currentStepNumber]);
    EditorMask.showOldMasks();
  }

  prevStep() {
    this.currentStepNumber--;
    this.startImageLoad();
    this.currentStepData = deepCopy(this.steps[this.currentStepNumber]);
    EditorMask.showOldMasks();
  }

  // скорее всего вообще больше не нужна эта функция, стараться от неё уйти
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

  updateAction(firstPoint, secondPoint) {
    const step = deepCopy(this.currentStepData);
    step.metaInfo.boxCoords.upperLeft = calculateTopLeft(
      firstPoint,
      secondPoint
    );
    step.metaInfo.boxCoords.width = calculateWidth(firstPoint, secondPoint);
    step.metaInfo.boxCoords.height = calculateHeight(firstPoint, secondPoint);
    this.currentStepData = step;
  }

  saveStepAction() {
    this.steps[this.currentStepNumber] = deepCopy(this.currentStepData);
    this.saveStepToUpdate();
  }

  cancelStepAction() {
    this.currentStepData = deepCopy(this.steps[this.currentStepNumber]);
  }

  // НАДО НАПИСАТЬ ФУНКЦИИ SAVESTEPBOXCOODRS И ADDTOUPDATEBOXCOORDS

  deleteStep() {
    this.toDelete = [...this.toDelete, this.currentStepData.UID];
    const stepsNew = deepCopy(this.steps);
    stepsNew.splice(this.currentStepNumber, 1);
    this.steps = stepsNew;
    if (this.currentStepNumber < this.steps.length - 1)
      this.currentStepNumber += 0;
    else if (this.currentStepNumber !== 0) this.currentStepNumber -= 1;
    this.currentStepData = this.steps[this.currentStepNumber];
  }

  setActionType(type_id) {
    const step = deepCopy(this.currentStepData);
    step.actionID = type_id;
    this.currentStepData = step;
  }

  // Может, перенести в другой стор? он тут вроде не важен
  showActionPicker() {
    this.actionPickerVisible = true;
  }

  // Может, перенести в другой стор? он тут вроде не важен
  hideActionPicker() {
    this.actionPickerVisible = false;
  }

  // Может, перенести в другой стор? он тут вроде не важен
  toggleActionPickerVisible() {
    this.actionPickerVisible = !this.actionPickerVisible;
  }

  async scriptUpdate() {
    await ScriptsApi.updateScript(
      EditorMain.scriptUID,
      this.toDelete,
      this.toUpdate
    );
  }

  // Может, перенести в другой стор?
  startImageLoad() {
    this.imageLoaded = false;
  }

  // Может, перенести в другой стор?
  finishImageLoad() {
    this.imageLoaded = true;
  }
}

export default new EditorStep();
