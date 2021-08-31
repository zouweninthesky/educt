import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Author from './components/author/Author';
import User from './components/user/User';
import EditorTemp from './components/editor/EditorTemp';
import Player from './components/player/Player';

const App = () => {
  return (
    <Switch>
      <Route path="/user" component={User} />
      <Route path="/player" component={Player} />
      <Route path="/editor" component={EditorTemp} />
      <Route path="/author" component={Author} />
      <Redirect from="/" to="user" />
    </Switch>
  );
}

export default App;
