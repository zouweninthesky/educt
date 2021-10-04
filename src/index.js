import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./assets/scss/style.scss";

import App from "./App";
import ModalProvider from "./components/common/Modal/ModalContext";

ReactDOM.render(
  <ModalProvider>
    <Router>
      <App />
    </Router>
  </ModalProvider>,
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
