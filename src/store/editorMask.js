import { action, makeObservable, observable } from "mobx";

import EditorStep from "./editorStep";
import { deepCopy } from "../utils/deepCopy";

class EditorMask {
  // Создать массив масок, сохранять изменения масок в этот массив, запрос на запекание масок и отправку замененных
  // изображений тоже вызывать из этого стора
  toMask = [];
  // Счетчик для уникальных id масок
  currentMasks = [];
  lastMaskId = 0;

  constructor() {
    makeObservable(this, {
      toMask: observable,
      currentMasks: observable,
      lastMaskId: observable,
      resetStore: action,
      addMask: action,
      deleteMask: action,
      saveStepMasks: action,
      cancelStepMasks: action,
      repeatStepMasks: action,
    });
  }

  resetStore() {
    this.lastMaskId = 0;
    this.toMask = [];
    this.currentMasks = [];
  }

  addMask(topLeft, bottomRight) {
    const newMask = {
      topLeft,
      bottomRight,
      UID: `${EditorStep.currentStepData.UID}${this.lastMaskId}`,
    };
    this.currentMasks.push(newMask);
    this.lastMaskId++;
  }

  showOldMasks() {
    const index = this.toMask.findIndex(
      (obj) => obj.UID === EditorStep.currentStepData.UID
    );
    if (index !== -1) {
      this.currentMasks = [...this.toMask[index].masks];
    } else {
      this.currentMasks = [];
    }
  }

  deleteMask(id) {
    // Ищет маску в только что созданных
    const currentMasksIndex = this.currentMasks.findIndex(
      (obj) => obj.UID === id
    );
    if (currentMasksIndex !== -1) {
      this.currentMasks.splice(currentMasksIndex, 1);
    }
    // Ищет маску в уже сохранённых ранее
  }

  saveStepMasks() {
    const index = this.toMask.findIndex(
      (obj) => obj.UID === EditorStep.currentStepData.UID
    );
    if (index !== -1) {
      this.toMask[index].masks = [...this.currentMasks];
    } else {
      this.toMask.push({
        UID: EditorStep.currentStepData.UID,
        imageUID: EditorStep.currentStepData.imageUID,
        masks: [...this.currentMasks],
      });
    }
  }

  cancelStepMasks() {
    this.showOldMasks();
  }

  repeatStepMasks() {
    const prevUID = EditorStep.steps[EditorStep.currentStepNumber - 1].UID;
    const prevStep = this.toMask.find((obj) => obj.UID === prevUID);
    if (prevStep !== -1) {
      this.currentMasks = [...deepCopy(prevStep.masks)];
    }
  }
}

export default new EditorMask();
