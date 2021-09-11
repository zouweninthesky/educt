import React from "react";
import Viewbox from "../common/Viewbox/Viewbox";
import Tools from "./Tools/Tools";

const Editor = () => {
  return (
    <main className="editor">
      <Viewbox mod={"editor"} />

      <Tools />
    </main>
  );
};

export default Editor;
