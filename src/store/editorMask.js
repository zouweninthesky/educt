import { makeAutoObservable, toJS } from "mobx";
// import Scripts from "./scripts";

import EditorStep from "./editorStep";
import { deepCopy } from "../utils/deepCopy";
// import {
//   calculateHeight,
//   calculateTopLeft,
//   calculateWidth,
// } from "../utils/calculateMaskCoords";

class EditorMask {
  // Создать массив масок, сохранять изменения масок в этот массив, запрос на запекание масок и отправку замененных
  // изображений тоже вызывать из этого стора
  // Счетчик для уникальных id масок
  lastMaskId = 0;

  constructor() {
    makeAutoObservable(this);
  }

  resetStore() {
    this.lastMaskId = 0;
  }

  addMask(topLeft, bottomRight) {
    // console.log(toJS(this.currentStepData));
    EditorStep.currentStepData.masks.push({
      topLeft,
      bottomRight,
      id: this.lastMaskId,
    });
    this.lastMaskId++;
  }

  deleteMask(id) {
    // masks, кажется, должен вообще не тут быть
    const index = EditorStep.currentStepData.masks.findIndex(
      (el) => el.id === id
    );
    EditorStep.currentStepData.masks.splice(index, 1);
  }

  saveStepMasks() {
    const stepNew = { ...EditorStep.currentStepData };
    stepNew.actionID = EditorStep.steps[EditorStep.currentStepNumber].actionID;
    stepNew.metaInfo = deepCopy(
      EditorStep.steps[EditorStep.currentStepNumber].metaInfo
    );
    EditorStep.steps[EditorStep.currentStepNumber] = deepCopy(stepNew);
    EditorStep.saveStepToUpdate();
  }

  cancelStepMasks() {
    console.log("cancel");
    // masks, кажется, должен вообще не тут быть
    EditorStep.currentStepData.masks = deepCopy(
      EditorStep.steps[this.currentStepNumber].masks
    );
  }

  repeatStepMasks() {
    console.log(EditorStep.currentStepData.shrinkRatio);
    const stepNew = deepCopy(EditorStep.currentStepData);
    stepNew.masks = deepCopy(
      EditorStep.steps[this.currentStepNumber - 1].masks
    );
    EditorStep.currentStepData = stepNew;
    console.log(EditorStep.currentStepData.shrinkRatio);
  }
}

export default new EditorMask();
