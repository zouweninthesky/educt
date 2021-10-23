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
import EditorClass from "../../store/editor";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import Loader from "../common/Loader/Loader";
import SavingArea from "./SavingArea/SavingArea";
import request from "../../api/request";
import ZoomPanel from "./ZoomPanel/ZoomPanel";

const HEADER_TOOLS_ON = "Все слайды";
const HEADER_TOOLS_OFF = "Вернуться к списку";

const Editor = observer(({ scriptUid }) => {
  const [, setModalID] = useModal();

  const [state] = useState(() => new EditorClass(scriptUid));
  useEffect(() => {
    (async () => {
      await state.getSteps(scriptUid);
    })();
  }, [scriptUid]);

  const headerContent = () => {
    if (state.mode === "tools")
      return (
        <>
          <button
            className="editor__arrow-button button button--simple button--icon-only"
            type="button"
            onClick={() => state.setOverviewMode()}
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
    switch (state.mode) {
      case "mask":
        return (
          <ZoomPanel
            maskMode={true}
            data={state}
            onApply={() => {
              state.saveStepMasks();
              state.setDefaultMode();
            }}
            onCancel={() => {
              state.cancelStepMasks();
              state.setDefaultMode();
            }}
            onRepeatMasks={() => state.repeatStepMasks()}
          />
        );
      case "tools":
        return (
          <section className="editor__panel">
            <div className="editor__header-wrapper">{headerContent()}</div>
            <Tools data={state} />
          </section>
        );
      case "action":
        return (
          <ZoomPanel
            data={state}
            onApply={() => {
              state.saveStepAction();
              state.setDefaultMode();
            }}
            onCancel={() => {
              console.log("cancel");
              state.cancelStepAction();
              state.setDefaultMode();
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

  if (state.loading) return <Loader />;

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
    setUpdatingSteps(state.toUpdate);
  };

  const viewboxModifier =
    state.mode === "mask" || state.mode === "action" ? "" : "editor";

  return (
    <main className="editor">
      <Viewbox
        data={state}
        mod={viewboxModifier}
        isEditor={true}
        maskActive={state.mode === "mask"}
        onNewMask={(topLeft, bottomRight) =>
          state.addMask(topLeft, bottomRight)
        }
        onDeleteMask={(key) => state.deleteMask(key)}
        onShrinkRatioChange={(sr) => state.changeShrinkRatio(sr)}
      />

      {currentPanel()}
      {SavingAreas()}
      <CommentModal />
      <DeleteModal onDelete={() => state.deleteStep()} />
      <NoSaveModal />
      <SettingsModal />
      <Overlay />
    </main>
  );
});

export default Editor;
