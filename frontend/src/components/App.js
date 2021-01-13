import React, { useEffect, useState } from "react";
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
import CreateShift from "./modals/CreateShift";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    window.addEventListener("resize", () => {
      store.dispatch(setWidth(window.innerWidth));
    });
  }, []);

  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [type, setType] = useState("");
  const [shiftInfo, setShiftInfo] = useState({});
  
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1000);


  const modalProps = {
    setOpen,
    setUpdate,
    setType,
    setShiftInfo
  }

  return (
    <Provider store={store}>
      <Router>
        <ToastContainer position="bottom-center" />
        <CreateShift
          open={open}
          type={type}
          onConfirm={() => {
            setOpen(false);
          }}
          onClose={() => {
            setOpen(false);
          }}
          update={update}
          sidebarOpen={sidebarOpen}
          {...shiftInfo}
        />
        <SideNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="sidenav__bar">
          <i onClick={() => {
              setSidebarOpen(!sidebarOpen);
            }} class={`fas fa-bars`}></i>
        </div>
        <div className={`App ${sidebarOpen ? "open" : ""}`}>
          
          <Switch>
            <PrivateRoute
              path="/"
              exact
              component={Home}
              user_only_pass={true}
            />
            <PrivateRoute path="/rota" exact component={Rota} modalProps={modalProps} />
            <PrivateRoute path="/template" exact component={ShiftTemplate} />
            <PrivateRoute admin={true} path="/staff-management" exact component={StaffManagement} modalProps={modalProps} />
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
