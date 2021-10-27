import React from "react";
import { useHistory } from "react-router";

import DeleteScriptModal from "../../common/Modal/common modals/DeleteScriptModal";

import EditorStore from "../../../store/editor";

const EditorDeleteScriptModal = () => {
  const history = useHistory();

  return (
    <DeleteScriptModal
      onDelete={async () => {
        await EditorStore.scriptDelete();
        EditorStore.resetStore();
        history.push("/author");
      }}
    />
  );
};

export default EditorDeleteScriptModal;
