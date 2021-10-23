import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { STORAGE_URL } from "../../utils/constants/links";
import "./Editor.scss";

import Icon from "../common/Icon/Icon";
import Viewbox from "../common/Viewbox/Viewbox";
import Overview from "./Overview/Overview";
import Tools from "./Tools/Tools";
import DeleteModal from "./modals/DeleteModal";
import Overlay from "../common/Modal/Overlay";
import CommentModal from "./modals/CommentModal";
import SettingsModal from "./modals/SettingsModal";
import NoSaveModal from "./modals/NoSaveModal";
import { useModal } from "../common/Modal/ModalContext";
import EditorStore from "../../store/editor";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import Loader from "../common/Loader/Loader";
import SavingArea from "./SavingArea/SavingArea";
import request from "../../api/request";
import ZoomPanel from "./ZoomPanel/ZoomPanel";

const HEADER_TOOLS_ON = "Все слайды";
const HEADER_TOOLS_OFF = "Вернуться к списку";

const Editor = observer(({ scriptUID }) => {
  const [, setModalID] = useModal();

  useEffect(() => {
    (async () => {
      await EditorStore.getSteps(scriptUID);
    })();
  }, [scriptUID]);

  const headerContent = () => {
    if (EditorStore.mode === "tools")
      return (
        <>
          <button
            className="editor__arrow-button button button--simple button--icon-only"
            type="button"
            onClick={() => EditorStore.setOverviewMode()}
          >
            <Icon id="arrow-left" width="24" />
          </button>
          <h2 className="editor__header">{HEADER_TOOLS_ON}</h2>
        </>
      );

    return (
      <>
        <Link
          to="/author"
          className="editor__arrow-button button button--simple button--icon-only"
        >
          <Icon id="arrow-left" width="24" />
        </Link>
        <h2 className="editor__header">{HEADER_TOOLS_OFF}</h2>
        <button
          className="editor__save-button button button--simple"
          type="button"
          onClick={() => saveAll()}
        >
          <Icon id="save" width="22" />
          Сохранить и выйти
        </button>
      </>
    );
  };

  const currentPanel = () => {
    switch (EditorStore.mode) {
      case "mask":
        return (
          <ZoomPanel
            maskMode={true}
            onApply={() => {
              EditorStore.saveStepMasks();
              EditorStore.setDefaultMode();
            }}
            onCancel={() => {
              EditorStore.cancelStepMasks();
              EditorStore.setDefaultMode();
            }}
            onRepeatMasks={() => EditorStore.repeatStepMasks()}
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
              EditorStore.saveStepAction();
              EditorStore.setDefaultMode();
            }}
            onCancel={() => {
              EditorStore.cancelStepAction();
              EditorStore.setDefaultMode();
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
  useEffect(() => {
    if (
      maskedImages.length > 0 &&
      maskedImages.length === updatingSteps.length
    ) {
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
        console.log("evth uploaded");
      })();
    }
  }, [maskedImages, updatingSteps]);

  // will depend on currentSlide being not null

  if (EditorStore.loading) return <Loader />;

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
    setUpdatingSteps(EditorStore.toUpdate);
  };

  const viewboxModifier =
    EditorStore.mode === "mask" || EditorStore.mode === "action"
      ? ""
      : "editor";

  return (
    <main className="editor">
      <Viewbox
        mod={viewboxModifier}
        isEditor={true}
        maskActive={EditorStore.mode === "mask"}
        onNewMask={(topLeft, bottomRight) =>
          EditorStore.addMask(topLeft, bottomRight)
        }
        onDeleteMask={(key) => EditorStore.deleteMask(key)}
        onShrinkRatioChange={(sr) => EditorStore.changeShrinkRatio(sr)}
      />

      {currentPanel()}
      {SavingAreas()}
      <CommentModal />
      <DeleteModal onDelete={() => EditorStore.deleteStep()} />
      <NoSaveModal />
      <SettingsModal />
      <Overlay />
    </main>
  );
});

export default Editor;
