import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import PrivateRoute from "./components/common/PrivateRoute/PrivateRoute";
import Author from "./components/author/Author";
import Editor from "./components/editor/Editor";
import Login from "./components/login/Login";
import Player from "./components/player/Player";
import Register from "./components/register/Register";
import User from "./components/user/User";
import Sprite from "./components/common/Sprite/Sprite";
import ErrorIndicator from "./components/common/ErrorIndicator/ErrorIndicator";
import Loader from "./components/common/Loader/Loader";

import Store from "./store";
import SpritePage from "./utils/SpritePage";

const error = null;

const App = () => {
  return (
    <>
      <Sprite />
      <ErrorIndicator error={error} />
      <Loader loading={Store.loading} />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/user">
          <User />
        </PrivateRoute>
        <PrivateRoute path="/player">
          <Player />
        </PrivateRoute>
        <PrivateRoute path="/editor">
          <Editor />
        </PrivateRoute>
        <PrivateRoute path="/author">
          <Author />
        </PrivateRoute>
        <PrivateRoute path="/sprite">
          <SpritePage />
        </PrivateRoute>
        <Redirect from="/" to="user" />
      </Switch>
    </>
  );
};

export default App;
