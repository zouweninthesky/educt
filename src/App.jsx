import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Author from "./components/author/Author";
import Editor from "./components/editor/Editor";
import Login from "./components/login/Login";
import Player from "./components/player/Player";
import Register from "./components/register/Register";
import SpritePage from "./utils/SpritePage";
import User from "./components/user/User";

const App = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/user" component={User} />
      <Route path="/player" component={Player} />
      <Route path="/editor" component={Editor} />
      <Route path="/author" component={Author} />
      <Route path="/sprite" component={SpritePage} />
      <Redirect from="/" to="user" />
    </Switch>
  );
};

export default App;
