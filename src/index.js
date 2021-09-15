import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./assets/scss/style.scss";

import App from "./App";
import ErrorBoundry from "./components/common/ErrorBoundry/ErrorBoundry";
import Sprite from "./components/common/Sprite/Sprite";

ReactDOM.render(
  <ErrorBoundry>
    <Router>
      <Sprite />
      <App />
    </Router>
  </ErrorBoundry>,
  document.getElementById("root")
);
