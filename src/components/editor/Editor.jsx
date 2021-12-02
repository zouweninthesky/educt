import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
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

import Store from "../../store";
import EditorMainStore from "../../store/editorMain";
import EditorStepStore from "../../store/editorStep";
import EditorMaskStore from "../../store/editorMask";
import { useModal } from "../common/Modal/ModalContext";
import request from "../../api/request";

import { MODAL_NO_SAVE_ID } from "../../utils/constants/modals";
const HEADER_TOOLS_ON = "Все слайды";
const HEADER_TOOLS_OFF = "Вернуться к списку";

const Editor = observer(({ scriptUID }) => {
  const [, setModalID] = useModal();

  const history = useHistory();

  useEffect(() => {
    (async () => {
      await EditorMainStore.getSteps(scriptUID);
    })();
  }, [scriptUID]);

  const headerContent = () => {
    if (EditorMainStore.mode === "tools")
      return (
        <>
          <button
            className="editor__arrow-button button button--simple button--icon-only"
            type="button"
            onClick={() => EditorMainStore.setOverviewMode()}
          >
            <Icon id="arrow-left" width="24" />
          </button>
          <h2 className="editor__header">{HEADER_TOOLS_ON}</h2>
        </>
      );

    const backButton = () => {
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

    return (
      <>
        {backButton()}
        <h2 className="editor__header">{HEADER_TOOLS_OFF}</h2>
        <button
          className="editor__save-button button button--simple"
          type="button"
          onClick={async () => {
            EditorMainStore.startSending();
            await EditorMainStore.scriptUpdate();
            await saveAll();
          }}
        >
          <Icon id="save" width="22" />
          Сохранить и выйти
        </button>
      </>
    );
  };

  const currentPanel = () => {
    switch (EditorMainStore.mode) {
      case "mask":
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
      case "tools":
        return (
          <section className="editor__panel">
            <div className="editor__header-wrapper">{headerContent()}</div>
            <Tools />
          </section>
        );
      case "action":
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
      case "overview":
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

  const [updatingSteps, setUpdatingSteps] = useState([]);

  const [maskedImages, setMaskedImages] = useState([]); // [{imageId, imageSrc}...]

  // updates only images
  useEffect(() => {
    // console.log("here we go");
    if (
      maskedImages.length > 0 &&
      maskedImages.length === updatingSteps.length
    ) {
      console.log("starting!");
      // console.log(maskedImages);
      (async () => {
        console.log("getting update links");
        const updateLinks = await request("https://educt.ru/storage/url/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            images: maskedImages.map((el) => el.imageUID),
          }),
        });
        console.log(updateLinks, "got update links, sending photos");
        await Promise.all(
          updateLinks.urls.map(async ({ imageUID, url }) => {
            return await request(
              url,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "image/png",
                },
                body: maskedImages.find((obj) => obj.imageUID === imageUID)
                  .imageBin,
              },
              true
            );
          })
        );
        history.push("/author");
        console.log("evth uploaded");
      })();
    }
  }, [maskedImages, updatingSteps]);

  // will depend on currentSlide being not null

  if (EditorMainStore.loading) return <Loader />;

  const SavingAreas = () => {
    return updatingSteps.map((step) => (
      <SavingArea
        step={step}
        key={step.UID}
        onSaveImage={(imageObj) => setMaskedImages([...maskedImages, imageObj])}
      />
    ));
  };

  const saveAll = () => {
    console.log("starting save");
    EditorMainStore.startSending();
    setUpdatingSteps(EditorStepStore.toUpdate);
    // EditorMainStore.finishSending();
    // history.push("/author");
  };

  const viewboxModifier =
    EditorMainStore.mode === "mask" || EditorMainStore.mode === "action"
      ? ""
      : "editor";

  return (
    <main className="editor">
      <ViewboxEditor
        mod={viewboxModifier}
        isEditor={true}
        maskActive={EditorMainStore.mode === "mask"}
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
