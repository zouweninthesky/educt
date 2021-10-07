import { makeAutoObservable } from "mobx";

import ScriptsApi from "../api/UserScriptService";

const Api = new ScriptsApi();

class Editor {
  // Передается из другого store (?), для отправки запроса к api
  scriptUID = null;
  // Название и описания сценария, изменение чисто их работает отдельно, не триггерит общее
  // "Сохранить и выйти" и сопутствующие предупреждения
  scriptTitle = null;
  scriptDescription = null;
  // Откуда будут браться степы для отображения и редактирования
  stepsOld = [];
  // Объект текущего степа, в него закидывается тот степ, который сейчас открыт из stepsOld
  currentStep = null;
  // Массив удаленных степов, чисто их uid
  toDelete = [];
  // Массив измененных степов, они формируются из currentStep
  // masks добавляется к
  toUpdate = [];
  // Не уверен, что нужно
  loading = true;
  // Ошибка, думаю, все же нужна, но не уверен, как её
  error = null;
  // Состояние, когда пользователь все сохранил и ждет отправки всех запросов
  sending = null;

  constructor() {
    makeAutoObservable(this);
  }

  scriptSet(uid) {
    this.scriptID = uid;
  }

  scriptRequested() {
    this.loading = true;
  }

  scriptLoad() {
    const data = await Api.getUserScripts();
    this.scriptOld.title = data.title;
    this.scriptOld.description = data.description;
    this.stepsOld = data.steps;
  }

  // Пользователь нажимает "сохранить" - сравнивается со старым
  // стейтом,
  // Должна быть проверка - изменены или нет. Не знаю, может,
  // снаружи.
  scriptTitleDescriptionChange(title, description) {}
}
