import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { toJS } from "mobx";
import "./Editor.scss";

import Icon from "../common/Icon/Icon";
import ViewboxEditor from "../common/Viewbox/VIewboxEditor";
import Overview from "./Overview/Overview";
import Tools from "./Tools/Tools";
import Loader from "../common/Loader/Loader";
import SavingArea from "./SavingArea/SavingArea";
import ZoomPanel from "./ZoomPanel/ZoomPanel";
import DeleteStepModal from "./modals/DeleteStepModal";
import DeleteScriptModal from "./modals/EditorDeleteScriptModal";
import CommentModal from "./modals/CommentModal";
import SettingsModal from "./modals/SettingsModal";
import NoSaveModal from "./modals/NoSaveModal";
import Overlay from "../common/Modal/Overlay";

import EditorMainStore from "../../store/editorMain";
import EditorStepStore from "../../store/editorStep";
import EditorMaskStore from "../../store/editorMask";
import UserScriptService from "../../api/UserScriptService";
import { useModal } from "../common/Modal/ModalContext";

import { MODAL_NO_SAVE_ID } from "../../utils/constants/modals";
import {
  EDITOR_MODE_TOOLS,
  EDITOR_MODE_ACTION,
  EDITOR_MODE_MASK,
  EDITOR_MODE_OVERVIEW,
} from "../../utils/constants/modes";
import {
  EDITOR_HEADER_TOOLS_OFF,
  EDITOR_HEADER_TOOLS_ON,
} from "../../utils/constants/textStrings";

const Editor = observer(({ scriptUID }) => {
  const [, setModalID] = useModal();

  const history = useHistory();

  useEffect(() => {
    (async () => {
      await EditorMainStore.getSteps(scriptUID);
    })();
  }, [scriptUID]);

  const backButton = () => {
    if (EditorMainStore.mode === EDITOR_MODE_TOOLS)
      return (
        <button
          className="editor__arrow-button button button--simple button--icon-only"
          type="button"
          onClick={() => EditorMainStore.setOverviewMode()}
        >
          <Icon id="arrow-left" width="24" />
        </button>
      );

    if (
      EditorStepStore.toDelete.length !== 0 ||
      EditorStepStore.toUpdate.length !== 0
    ) {
      // EditorStepStore.toUpdateDescription.length !== 0 ||
      // EditorStepStore.toUpdateActionID.length !== 0 ||
      // EditorStepStore.toUpdateBoxCoords.length !== 0 ||
      // EditorStepStore.toUpdateText.length !== 0
      return (
        <button
          type="button"
          className="editor__arrow-button button button--simple button--icon-only"
          onClick={() => setModalID(MODAL_NO_SAVE_ID)}
        >
          <Icon id="arrow-left" width="24" />
        </button>
      );
    }
    return (
      <Link
        to="/author"
        className="editor__arrow-button button button--simple button--icon-only"
        onClick={() => EditorMainStore.resetStore()}
      >
        <Icon id="arrow-left" width="24" />
      </Link>
    );
  };

  const headerContent = () => {
    return (
      <>
        {backButton()}
        <h2 className="editor__header">
          {EditorMainStore.mode === EDITOR_MODE_TOOLS
            ? EDITOR_HEADER_TOOLS_ON
            : EDITOR_HEADER_TOOLS_OFF}
        </h2>
        {EditorMainStore.mode !== EDITOR_MODE_TOOLS && (
          <button
            className="editor__save-button button button--simple"
            type="button"
            onClick={async () => {
              await EditorMainStore.scriptUpdate();
              // invokes masking
              if (EditorMaskStore.toMask.length !== 0) {
                setStepsToMask(EditorMaskStore.toMask);
              } else history.push("/author");
            }}
          >
            <Icon id="save" width="22" />
            Сохранить и выйти
          </button>
        )}
      </>
    );
  };

  const currentPanel = () => {
    switch (EditorMainStore.mode) {
      case EDITOR_MODE_MASK:
        return (
          <ZoomPanel
            maskMode={true}
            onApply={() => {
              EditorMaskStore.saveStepMasks();
              EditorMainStore.setToolsMode();
            }}
            onCancel={() => {
              EditorMaskStore.cancelStepMasks();
              EditorMainStore.setToolsMode();
            }}
            onRepeatMasks={() => EditorMaskStore.repeatStepMasks()}
          />
        );
      case EDITOR_MODE_TOOLS:
        return (
          <section className="editor__panel">
            <div className="editor__header-wrapper">{headerContent()}</div>
            <Tools />
          </section>
        );
      case EDITOR_MODE_ACTION:
        return (
          <ZoomPanel
            onApply={() => {
              EditorStepStore.saveStepAction();
              EditorMainStore.setToolsMode();
            }}
            onCancel={() => {
              EditorStepStore.cancelStepAction();
              EditorMainStore.setToolsMode();
            }}
          />
        );
      case EDITOR_MODE_OVERVIEW:
        return (
          <section className="editor__panel">
            <div className="editor__header-wrapper">{headerContent()}</div>
            <Overview />
          </section>
        );
      default:
        return (
          <section className="editor__panel">
            <div className="editor__header-wrapper">{headerContent()}</div>
            <Overview />
          </section>
        );
    }
  };

  const [stepsToMask, setStepsToMask] = useState([]);

  const [maskedImages, setMaskedImages] = useState([]); // [{imageId, imageSrc}...]

  // updates only images
  useEffect(() => {
    if (maskedImages.length > 0 && maskedImages.length === stepsToMask.length) {
      (async () => {
        const updateLinks = await UserScriptService.getImageUpdateLinks(
          maskedImages
        );
        await Promise.all(
          updateLinks.urls.map(async ({ imageUID, url }) => {
            const imageBin = maskedImages.find(
              (obj) => obj.imageUID === imageUID
            ).imageBin;
            await UserScriptService.replaceImagesStorage(imageBin, url);
            return;
          })
        );
        history.push("/author");
      })();
    }
  }, [maskedImages, stepsToMask]);

  if (EditorMainStore.loading) return <Loader />;

  const SavingAreas = () => {
    return stepsToMask.map((step) => (
      <SavingArea
        step={step}
        key={step.UID}
        onSaveImage={(imageObj) => {
          setMaskedImages((maskedImages) => [...maskedImages, imageObj]);
        }}
      />
    ));
  };

  const viewboxModifier =
    EditorMainStore.mode === EDITOR_MODE_MASK ||
    EditorMainStore.mode === EDITOR_MODE_ACTION
      ? ""
      : "editor";

  return (
    <main className="editor">
      <ViewboxEditor
        mod={viewboxModifier}
        isEditor={true}
        maskActive={EditorMainStore.mode === EDITOR_MODE_MASK}
        onDeleteMask={(key) => EditorMaskStore.deleteMask(key)}
        onShrinkRatioChange={(sr) => EditorStepStore.changeShrinkRatio(sr)}
      />

      {currentPanel()}
      {SavingAreas()}
      <CommentModal step={EditorStepStore.currentStepData.description} />
      <DeleteStepModal onDelete={() => EditorStepStore.deleteStep()} />
      <DeleteScriptModal />
      <NoSaveModal />
      <SettingsModal />
      <Overlay />
    </main>
  );
});

export default Editor;
