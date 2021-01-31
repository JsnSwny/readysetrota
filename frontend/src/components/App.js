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
import { resetErrors } from "../actions/errors";

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

import AdminPanel from "./profiles/dashboard/AdminPanel";
import Checkout from "./accounts/Checkout";

import Confirm from "./layout/Confirm"

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
  
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [onConfirm, setOnConfirm] = useState(false);
  const [message, setMessage] = useState(false);
  
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1000);


  const modalProps = {
    setOpen,
    setUpdate,
    setType,
    setShiftInfo
  }

  const confirmProps = {
    setConfirmOpen,
    setOnConfirm,
    setMessage
  }

  return (
    <Provider store={store}>
      <Router>
        <ToastContainer position="bottom-center" autoClose={2500} />
        <CreateShift
          open={open}
          type={type}
          onConfirm={() => {
            setOpen(false);
          }}
          onClose={() => {
            setOpen(false);
            store.dispatch(resetErrors());
          }}
          update={update}
          sidebarOpen={sidebarOpen}
          {...shiftInfo}
          confirmProps={confirmProps}
        />
        <Confirm open={confirmOpen} onConfirm={onConfirm} onClose={() => {
          setConfirmOpen(!confirmOpen)}} message={message} sidebarOpen={sidebarOpen} />
        <SideNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} confirmProps={confirmProps} />
        <div className="sidenav__bar">
          <i onClick={() => {
              setSidebarOpen(!sidebarOpen);
            }} className={`fas fa-bars`}></i>
        </div>
        <div className={`App ${sidebarOpen ? "open" : ""}`}>
          
          <Switch>
            <PrivateRoute
              path="/"
              exact
              component={Home}
              user_only_pass={true}
              modalProps={modalProps}
            />
            <PrivateRoute path="/rota" exact component={Rota} modalProps={modalProps} confirmProps={confirmProps} />
            <PrivateRoute path="/template" exact component={ShiftTemplate} />
            <PrivateRoute admin={true} path="/staff-management" exact component={StaffManagement} modalProps={modalProps} />
            <PrivateRoute admin={true} path="/admin-panel" exact component={AdminPanel} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/privacy" component={PrivacyPolicy} />
            <Route path="/terms" component={TermsAndConditions} />
            <PrivateRoute path="/changepassword" component={ChangePassword} />
            <PrivateRoute path="/profile/:id" component={StaffProfile} />
            <PrivateRoute path="/join/:id?" component={EnterID} pass={true} />
            <PrivateRoute path="/premium" component={Plans} />
            <PrivateRoute path="/checkout" component={Checkout} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
