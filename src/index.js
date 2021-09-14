import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./assets/scss/style.scss";

import App from "./App";
import ErrorBoundry from "./components/common/ErrorBoundry/ErrorBoundry";
import UserScriptsService from "./api/UserScriptsService";
import { UserScriptsProvider } from "./components/common/UserScriptsContext/UserScriptsContext";
import Sprite from "./components/common/Sprite/Sprite";

const userScriptsService = new UserScriptsService();

ReactDOM.render(
  <ErrorBoundry>
    <UserScriptsProvider value={userScriptsService}>
      <Router>
        <Sprite />
        <App />
      </Router>
    </UserScriptsProvider>
  </ErrorBoundry>,
  document.getElementById("root")
);
