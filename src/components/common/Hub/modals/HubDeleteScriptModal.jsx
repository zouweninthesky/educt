import React from "react";

import DeleteScriptModal from "../../Modal/common modals/DeleteScriptModal";

import Scripts from "../../../../store/scripts";

const HubDeleteScriptModal = () => {
  return <DeleteScriptModal onDelete={() => Scripts.scriptDelete()} />;
};

export default HubDeleteScriptModal;
