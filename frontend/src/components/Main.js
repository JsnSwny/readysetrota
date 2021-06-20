import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getEmployees,
  getDepartments,
  getPositions,
  getHolidays,
  getSites,
  updateSettings,
} from "../actions/employees";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SideNav from "./layout/SideNav";
import store from "../store";
import Rota from "./shifts/Rota";
import { format } from "date-fns";

import List from "./lists/List";

import Register from "./accounts/Register";
import Login from "./accounts/Login";

import PrivateRoute from "./common/PrivateRoute";
import Home from "./profiles/Home";
import { resetErrors } from "../actions/errors";

import ChangePassword from "./accounts/ChangePassword";
import StaffProfile from "./profiles/StaffProfile";
import EnterID from "./common/EnterID";
import Plans from "./accounts/Plans";
import PrivacyPolicy from "./landing/PrivacyPolicy";

import { ToastContainer } from "react-toastify";
import TermsAndConditions from "./landing/TermsAndConditions";

import StaffManagement from "./profiles/StaffManagement";
import CreateShift from "./modals/CreateShift";

import AdminPanel from "./profiles/dashboard/AdminPanel";
import Checkout from "./accounts/Checkout";

import Confirm from "./layout/Confirm";

import Settings from "./settings/Settings";
import Beta from "./landing/Beta";

import AvailabilityDashboard from "./availability/AvailabilityDashboard";

const Main = () => {
  const dispatch = useDispatch();

  // Use state
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [forecastDate, setForecastDate] = useState(false);
  const [type, setType] = useState("");
  const [shiftInfo, setShiftInfo] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [onConfirm, setOnConfirm] = useState(false);
  const [message, setMessage] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1000);

  // Selectors
  let departments = useSelector((state) => state.employees.departments);
  let current = useSelector((state) => state.employees.current);
  let loading = useSelector((state) => state.loading);
  let sites = useSelector((state) => state.employees.sites);
  let auth = useSelector((state) => state.auth);

  // Use effect
  useEffect(() => {
    if (sites.length == 0) {
      dispatch(getSites());
    }
    if (current.site.id > 0) {
      dispatch(getDepartments());
      if (sites.length > 0) {
        dispatch(
          updateSettings(
            sites.find((item) => item.id == current.site.id).sitesettings
          )
        );
      }
    }
  }, [current.site.id, auth.token]);

  useEffect(() => {
    if (!loading.departments && !loading.sites) {
      if (sites.length > 0) {
        dispatch(getEmployees(false));
        dispatch(getPositions(true));
        dispatch(getPositions());
        dispatch(
          updateSettings(
            sites.find((item) => item.id == current.site.id).sitesettings
          )
        );
      }
    }
  }, [departments, sites]);

  // Props
  const modalProps = {
    setOpen,
    setUpdate,
    setType,
    setShiftInfo,
    setForecastDate,
  };

  const confirmProps = {
    setConfirmOpen,
    setOnConfirm,
    setMessage,
  };

  return (
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
        forecastDate={forecastDate ? format(forecastDate, "yyyy-MM-dd") : false}
        confirmProps={confirmProps}
      />
      <Confirm
        open={confirmOpen}
        onConfirm={onConfirm}
        onClose={() => {
          setConfirmOpen(!confirmOpen);
        }}
        message={message}
        sidebarOpen={sidebarOpen}
      />
      <SideNav
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        confirmProps={confirmProps}
      />
      <div className="sidenav__bar">
        <i
          onClick={() => {
            setSidebarOpen(!sidebarOpen);
          }}
          className={`fas fa-bars`}
        ></i>
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
          <Route
            path="/beta"
            render={(props) => <Beta {...props} {...modalProps} test="TEST" />}
          />
          <PrivateRoute
            path="/list/:type"
            admin={true}
            exact
            component={List}
            modalProps={modalProps}
            confirmProps={confirmProps}
          />

          <PrivateRoute
            path="/rota"
            exact
            component={Rota}
            modalProps={modalProps}
            confirmProps={confirmProps}
          />

          <PrivateRoute
            path="/availability"
            exact
            component={AvailabilityDashboard}
            modalProps={modalProps}
            confirmProps={confirmProps}
          />

          <PrivateRoute
            admin={true}
            perms={[
              "manage_departments",
              "manage_positions",
              "manage_employees",
            ]}
            path="/staff-management"
            exact
            component={StaffManagement}
            modalProps={modalProps}
          />
          <PrivateRoute
            admin={true}
            path="/admin-panel"
            exact
            component={AdminPanel}
          />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/privacy" component={PrivacyPolicy} />
          <Route path="/terms" component={TermsAndConditions} />
          <PrivateRoute path="/changepassword" component={ChangePassword} />
          <PrivateRoute path="/settings" component={Settings} />
          <PrivateRoute path="/profile/:id" component={StaffProfile} />
          <PrivateRoute path="/join/:id?" component={EnterID} pass={true} />
          <PrivateRoute path="/premium" component={Plans} />
          <PrivateRoute path="/checkout" component={Checkout} />
        </Switch>
      </div>
    </Router>
  );
};

export default Main;
