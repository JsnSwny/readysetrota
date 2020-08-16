import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from "./layout/Nav";

import { Provider } from "react-redux";
import store from "../store";
import Shifts from "./shifts/Shifts";
import "../css/styles.css";
import Staff from "./employees/Staff";

import Register from "./accounts/Register";
import Login from "./accounts/Login";

import PrivateRoute from "./common/PrivateRoute";

import { loadUser } from "../actions/auth";
import Home from "./common/Home";
import { setWidth } from "../actions/responsive";

import ChangePassword from "./accounts/ChangePassword";
import Profile from "./shifts/Profile";
import EnterID from "./common/EnterID";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    window.addEventListener("resize", () => {
      store.dispatch(setWidth(window.innerWidth));
    });
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Nav />
          <ToastContainer position="bottom-center" />
          <Switch>
            <PrivateRoute
              path="/"
              exact
              component={Home}
              user_only_pass={true}
            />
            <PrivateRoute path="/rota" exact component={Shifts} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/changepassword" component={ChangePassword} />
            <PrivateRoute path="/profile/:id" component={Profile} />
            <PrivateRoute path="/join/:id?" component={EnterID} pass={true} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
