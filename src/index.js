import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./global/style.scss";

import App from "./App";
import ErrorBoundry from "./components/common/ErrorBoundry/ErrorBoundry";
import store from "./store";
import UserScriptsService from "./services/UserScriptsService";
import { UserScriptsProvider } from "./components/common/UserScriptsContext/UserScriptsContext";

const userScriptsService = new UserScriptsService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <UserScriptsProvider value={userScriptsService}>
        <Router>
          <App />
        </Router>
      </UserScriptsProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById("root")
);
