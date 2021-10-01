import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./assets/scss/style.scss";

import App from "./App";
import ErrorBoundry from "./components/common/ErrorBoundry/ErrorBoundry";
import ModalProvider from "./components/common/Modal/ModalContext";
import Sprite from "./components/common/Sprite/Sprite";
import UserScriptServiceNew from "./api/UserScriptServiceNew";

// const api = new UserScriptServiceNew();

// api.getScript("yvQuCB1SFmeye4ZT");

ReactDOM.render(
  <ErrorBoundry>
    <ModalProvider>
      <Router>
        <Sprite />
        <App />
      </Router>
    </ModalProvider>
  </ErrorBoundry>,
  document.getElementById("root")
);

const test = [
  {
    k1: "1",
    k2: "2",
    k3: "3",
  },
  {
    k1: "25",
    k2: "24",
    k3: "12",
  },
];

const updateValue = (oldObj, fieldName, value, index) => {
  oldObj[index][fieldName] = value;
  return oldObj;
};

console.log(updateValue(test, "k1", "6", 1));
