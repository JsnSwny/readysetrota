import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getEmployees,
  getDepartments,
  getPositions,
  getSites,
  updateSettings,
} from "../actions/employees";
import { getPermissionTypes } from "../actions/permissions";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "../store";
import Rota from "./shifts/Rota";
import { format } from "date-fns";

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
import CreateShift from "./modals/CreateShift";

import AdminPanel from "./profiles/dashboard/AdminPanel";
import Checkout from "./accounts/Checkout";

import Settings from "./settings/Settings";
import Beta from "./landing/Beta";
import Nav from "./layout/Nav";
import Availability from "./availability/Availability";
import Landing from "./landing/Landing";
import Timeclock from "./timeclock/Timeclock";
import EmployeesForm from "./management/forms/EmployeesForm";
import TimeclockPage from "./shifts/timeclock/TimeclockPage";

import Departments from "./management/tables/Departments";
import Positions from "./management/tables/Positions";
import Employees from "./management/tables/Employees";
import ForecastPage from "./forecasting/ForecastPage";
import ScrollToTop from "./layout/ScrollToTop";
import ReportsPage from "./reports/ReportsPage";

const Main = () => {
  const dispatch = useDispatch();

  // Use state
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [forecastDate, setForecastDate] = useState(false);
  const [type, setType] = useState("");
  const [shiftInfo, setShiftInfo] = useState({});
  const [holidayEmployee, setHolidayEmployee] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1000);
  const [extra, setExtra] = useState({});

  // Selectors
  let departments = useSelector((state) => state.employees.departments);
  let current = useSelector((state) => state.employees.current);
  let loading = useSelector((state) => state.loading);
  let sites = useSelector((state) => state.employees.sites);
  let auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

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
  }, [current.site.id, auth.token, auth.user]);

  useEffect(() => {
    if (!loading.departments && !loading.sites) {
      if (sites.length > 0) {
        dispatch(
          updateSettings(
            sites.find((item) => item.id == current.site.id).sitesettings
          )
        );
      }
    }
  }, [departments, sites]);

  useEffect(() => {
    if (!loading.sites) {
      if (sites.length > 0) {
        dispatch(getPositions(false));
        dispatch(getEmployees(true, false));
      }
    }
  }, [current.site]);

  useEffect(() => {
    dispatch(getPermissionTypes());
  }, []);

  // Props
  const modalProps = {
    setOpen,
    setUpdate,
    setType,
    setShiftInfo,
    setForecastDate,
    setHolidayEmployee,
    setExtra,
  };

  return (
    <Router>
      <ScrollToTop />
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
        holidayEmployee={holidayEmployee}
        extra={extra}
      />
      <Nav />
      <div className={`App`}>
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
            render={(props) => <Beta {...props} {...modalProps} />}
          />
          <Route
            path="/landing"
            render={(props) => <Landing {...props} {...modalProps} />}
          />

          <PrivateRoute
            path="/rota"
            exact
            component={Rota}
            modalProps={modalProps}
            title="Rota"
          />

          <PrivateRoute
            admin={true}
            perms={["manage_availabilities"]}
            path="/availability"
            exact
            component={Availability}
            modalProps={modalProps}
            title="Availability"
          />

          <PrivateRoute
            admin={true}
            perms={["manage_departments"]}
            path="/departments"
            exact
            component={Departments}
            title="Departments"
          />

          <PrivateRoute
            admin={true}
            perms={["manage_positions"]}
            path="/positions"
            exact
            component={Positions}
            title="Positions"
          />

          <PrivateRoute
            admin={true}
            perms={["manage_employees"]}
            path="/employees"
            exact
            component={Employees}
            title="Employees"
          />

          <PrivateRoute
            admin={true}
            perms={[
              "manage_departments",
              "manage_positions",
              "manage_employees",
            ]}
            path="/employees/:formType/:employeeId?"
            exact
            component={EmployeesForm}
            title="Employees"
          />

          <PrivateRoute
            admin={true}
            perms={["manage_shifts"]}
            path="/timesheet"
            exact
            component={TimeclockPage}
            title="Timesheet"
          />

          <PrivateRoute
            admin={true}
            perms={["manage_shifts"]}
            path="/forecasting"
            exact
            component={ForecastPage}
            title="Forecasting"
          />

          <PrivateRoute
            admin={true}
            path="/reports"
            exact
            component={ReportsPage}
            title="Reports"
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
          <Route path="/timeclock" component={Timeclock} />
        </Switch>
      </div>
    </Router>
  );
};

export default Main;
