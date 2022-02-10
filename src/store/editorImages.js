import { action, makeObservable, observable, toJS } from "mobx";

import GlobalStore from ".";
import EditorMainStore from "./editorMain";
import EditorStepStore from "./editorStep";
import EditorMaskStore from "./editorMask";
import ScriptsApi from "../api/UserScriptService";

class EditorImages {
  commentImages = [];
  tempCounter = 0;

  constructor() {
    makeObservable(this, {
      commentImages: observable,
      tempCounter: observable,
      addCommentImage: action,
      removeCommentImage: action,
      uploadCommentImages: action,
    });
  }

  addCommentImage(imageBlob, imageName) {
    // const imageUID = `${EditorMainStore.timeStamp}${this.tempCounter}`;
    // this.tempCounter++;
    // EditorStepStore.currentStepData.metaInfo.imageUIDs = [imageUID];
    this.commentImages.push({
      stepUID: EditorStepStore.currentStepData.UID.slice(),
      // imageUID =
      name: imageName,
      imageBlob,
    });

    console.log(this.commentImages);
  }

  // Пока работает только с только что загруженными изображениями
  removeCommentImage() {
    const index = this.commentImages.findIndex(
      (obj) => obj.stepUID === EditorStepStore.currentStepData.UID
    );
    if (index !== -1) {
      this.commentImages.splice(index, 1);
    }
  }

  async uploadCommentImages() {
    const linkObjects = await ScriptsApi.getImageUploadLinks(
      this.commentImages.length
    );

    this.commentImages.forEach(async (imageObj, i) => {
      const index = EditorStepStore.toUpdate.findIndex(
        (step) => step.UID === imageObj.stepUID
      );
      console.log(index);
      if (index !== -1) {
        EditorStepStore.toUpdate[index].metaInfo.imageUIDs = [
          `${linkObjects.urls[i].image_uid}`,
        ];
        console.log(EditorStepStore.toUpdate[index].metaInfo.imageUIDs);
      }

      await ScriptsApi.uploadImagesStorage(
        imageObj.imageBlob,
        linkObjects.urls[i].url
      );
    });
  }
}

export default new EditorImages();
