import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from "./layout/Nav";
import SideNav from "./layout/SideNav"

import { Provider } from "react-redux";
import store from "../store";
import Rota from "./shifts/Rota";
import ShiftTemplate from "./shifts/ShiftTemplate";
import "../css/styles.css";

import Register from "./accounts/Register";
import Login from "./accounts/Login";

import PrivateRoute from "./common/PrivateRoute";

import { loadUser } from "../actions/auth";
import Home from "./profiles/Home";
import { setWidth } from "../actions/responsive";

import ChangePassword from "./accounts/ChangePassword";
import StaffProfile from "./profiles/StaffProfile";
import EnterID from "./common/EnterID";
import Plans from "./accounts/Plans";
import PrivacyPolicy from "./landing/PrivacyPolicy";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TermsAndConditions from "./landing/TermsAndConditions";

import StaffManagement from "./profiles/StaffManagement";

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
        <ToastContainer position="bottom-center" />
        <SideNav />
        <div className="App">
          {/* <Nav /> */}
          
          <Switch>
            <PrivateRoute
              path="/"
              exact
              component={Home}
              user_only_pass={true}
            />
            <PrivateRoute path="/rota" exact component={Rota} />
            <PrivateRoute path="/template" exact component={ShiftTemplate} />
            <PrivateRoute path="/staff-management" exact component={StaffManagement} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/privacy" component={PrivacyPolicy} />
            <Route path="/terms" component={TermsAndConditions} />
            <PrivateRoute path="/changepassword" component={ChangePassword} />
            <PrivateRoute path="/profile/:id" component={StaffProfile} />
            <PrivateRoute path="/join/:id?" component={EnterID} pass={true} />

            <PrivateRoute path="/premium" component={Plans} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
