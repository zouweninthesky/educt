import React from "react";
import { useHistory } from "react-router";

import DeleteScriptModal from "../../common/Modal/common modals/DeleteScriptModal";

import EditorMainStore from "../../../store/editorMain";

const EditorDeleteScriptModal = () => {
  const history = useHistory();

  return (
    <DeleteScriptModal
      onDelete={async () => {
        await EditorMainStore.scriptDelete();
        EditorMainStore.resetStore();
        history.push("/author");
      }}
    />
  );
};

export default EditorDeleteScriptModal;
