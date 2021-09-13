import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Author from "./components/author/Author";
import User from "./components/user/User";
import Editor from "./components/editor/Editor";
import Player from "./components/player/Player";
import SpritePage from "./utils/SpritePage";

const App = () => {
  return (
    <Switch>
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
