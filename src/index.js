import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./assets/scss/style.scss";

import App from "./App";
import ModalProvider from "./components/common/Modal/ModalContext";

ReactDOM.render(
  <ModalProvider>
    <Router basename="/app">
      <App />
    </Router>
  </ModalProvider>,
  document.getElementById("root")
);
