import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Author from "./components/author/Author";
import Editor from "./components/editor/Editor";
import Login from "./components/login/Login";
import Player from "./components/player/Player";
import Exam from "./components/exam/Exam";
import Register from "./components/register/Register";
import User from "./components/user/User";
// import Welcome from "./components/welcome/Welcome";
// import SpritePage from "./utils/SpritePage";
import PrivateRoute from "./components/common/PrivateRoute/PrivateRoute";
import Sprite from "./components/common/Sprite/Sprite";
import ErrorIndicator from "./components/common/ErrorIndicator/ErrorIndicator";
import Loader from "./components/common/Loader/Loader";

const error = null;

const App = () => {
  console.log(process.env.PUBLIC_URL);
  return (
    <>
      <Sprite />
      <ErrorIndicator error={error} />
      <Loader />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
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
        <Redirect from="/" to="/user" />
        {/* <Route path={`${process.env.PUBLIC_URL}/login`} component={Login} />
        <Route
          path={`${process.env.PUBLIC_URL}/register`}
          component={Register}
        />
        <PrivateRoute path={`/user`}>
          <User />
        </PrivateRoute>
        <PrivateRoute path={`${process.env.PUBLIC_URL}/player`}>
          <Player />
        </PrivateRoute>
        <PrivateRoute path={`${process.env.PUBLIC_URL}/exam`}>
          <Exam />
        </PrivateRoute>
        <PrivateRoute
          path={`${process.env.PUBLIC_URL}/editor/:scriptUID`}
          component={(props) => <Editor {...props.match.params} />}
        />
        <PrivateRoute path={`${process.env.PUBLIC_URL}/author`}>
          <Author />
        </PrivateRoute>
        <Redirect
          from={`${process.env.PUBLIC_URL}/`}
          to={`${process.env.PUBLIC_URL}/user`}
        /> */}
      </Switch>
    </>
  );
};

export default App;
{
  /* <Route path="/" component={Welcome} exact /> */
}
{
  /* <PrivateRoute path="/sprite">
          <SpritePage />
        </PrivateRoute> */
}
