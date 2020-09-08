import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from "./layout/Nav";

import { Provider } from "react-redux";
import store from "../store";
import ShiftList from "./shifts/ShiftList";
import "../css/styles.css";

import Register from "./accounts/Register";
import Login from "./accounts/Login";

import PrivateRoute from "./common/PrivateRoute";

import { loadUser } from "../actions/auth";
import Home from "./profiles/Home";
import { setWidth } from "../actions/responsive";

import ChangePassword from "./accounts/ChangePassword";
import Profile from "./profiles/Profile";
import EnterID from "./common/EnterID";
import Landing from "./landing/Landing";
import Premium from "./accounts/Premium";
import Plans from "./accounts/Plans";
import PrivacyPolicy from "./landing/PrivacyPolicy";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TermsAndConditions from "./landing/TermsAndConditions";

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
            <PrivateRoute path="/rota" exact component={ShiftList} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/privacy" component={PrivacyPolicy} />
            <Route path="/terms" component={TermsAndConditions} />
            <PrivateRoute path="/changepassword" component={ChangePassword} />
            <PrivateRoute path="/profile/:id" component={Profile} />
            <PrivateRoute path="/join/:id?" component={EnterID} pass={true} />

            <PrivateRoute path="/premium" component={Plans} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
