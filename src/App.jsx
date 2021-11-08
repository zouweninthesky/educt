import React from "react";
import { Switch, Route } from "react-router-dom";

import Author from "./components/author/Author";
import Editor from "./components/editor/Editor";
import Login from "./components/login/Login";
import Player from "./components/player/Player";
import Exam from "./components/exam/Exam";
import Register from "./components/register/Register";
import User from "./components/user/User";
// import Welcome from "./components/welcome/Welcome";
import SpritePage from "./utils/SpritePage";
import PrivateRoute from "./components/common/PrivateRoute/PrivateRoute";
import Sprite from "./components/common/Sprite/Sprite";
import ErrorIndicator from "./components/common/ErrorIndicator/ErrorIndicator";
import Loader from "./components/common/Loader/Loader";

const error = null;

const App = () => {
  return (
    <>
      <Sprite />
      <ErrorIndicator error={error} />
      <Loader />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        {/* <Route path="/" component={Welcome} exact /> */}
        <PrivateRoute path="/user">
          <User />
        </PrivateRoute>
        <PrivateRoute path="/player">
          <Player />
        </PrivateRoute>
        <PrivateRoute path="/exam">
          <Exam />
        </PrivateRoute>
        <PrivateRoute
          path="/editor/:scriptUID"
          component={(props) => <Editor {...props.match.params} />}
        />
        <PrivateRoute path="/author">
          <Author />
        </PrivateRoute>
        <PrivateRoute path="/sprite">
          <SpritePage />
        </PrivateRoute>
      </Switch>
    </>
  );
};

export default App;
