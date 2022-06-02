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
import Rota from "./shifts/Rota";
import Register from "./accounts/Register";
import Login from "./accounts/Login";

import PrivateRoute from "./common/PrivateRoute";
import Home from "./profiles/Home";
import ChangePassword from "./accounts/ChangePassword";
import StaffProfile from "./profiles/StaffProfile";
import PrivacyPolicy from "./landing/PrivacyPolicy";

import { ToastContainer } from "react-toastify";
import TermsAndConditions from "./landing/TermsAndConditions";

import AdminPanel from "./profiles/dashboard/AdminPanel";

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
import Sites from "./management/tables/Sites";
import YourShifts from "./shifts/YourShifts";
import EmployeeJoin from "./accounts/EmployeeJoin";

import Billing from "./billing/Billing";

const Main = () => {
  const dispatch = useDispatch();

  // Selectors
  let departments = useSelector((state) => state.employees.departments);
  let current = useSelector((state) => state.employees.current);
  let loading = useSelector((state) => state.loading);
  let sites = useSelector((state) => state.employees.sites);
  let auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (
      !auth.isLoading &&
      auth.user &&
      (auth.user.employee.length > 0 || auth.user.business)
    ) {
      if (sites.length == 0) {
        dispatch(getSites());
      }
      if (current.site?.id > 0) {
        dispatch(getDepartments());
        if (sites.length > 0) {
          dispatch(
            updateSettings(
              sites.find((item) => item.id == current.site.id).sitesettings
            )
          );
        }
      }
    }
  }, [current.site?.id, auth.token, auth.user]);

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
      }
    }
  }, [current.site]);

  useEffect(() => {
    dispatch(getPermissionTypes());
  }, [auth.token]);

  return (
    <Router>
      <ScrollToTop />
      <ToastContainer position="bottom-center" autoClose={2500} />
      <Nav />
      <div className={`App`}>
        <Switch>
          <PrivateRoute path="/" exact component={Home} user_only_pass={true} />
          <Route path="/beta" render={(props) => <Beta {...props} />} />
          <Route path="/landing" render={(props) => <Landing {...props} />} />

          <PrivateRoute path="/rota" exact component={Rota} title="Rota" />

          <PrivateRoute
            perms={["manage_availabilities"]}
            path="/availability"
            exact
            component={Availability}
            title="Availability"
          />

          <PrivateRoute
            path="/billing"
            exact
            component={Billing}
            title="Billing"
          />

          <PrivateRoute
            perms={["manage_sites"]}
            path="/sites"
            exact
            component={Sites}
            title="Sites"
          />

          <PrivateRoute
            perms={["manage_departments"]}
            path="/departments"
            exact
            component={Departments}
            title="Departments"
          />

          <PrivateRoute
            perms={["manage_positions"]}
            path="/positions"
            exact
            component={Positions}
            title="Positions"
          />

          <PrivateRoute
            perms={["manage_employees"]}
            path="/employees"
            exact
            component={Employees}
            title="Employees"
          />

          <PrivateRoute
            perms={["manage_employees"]}
            path="/employees/:formType/:employeeId?"
            exact
            component={EmployeesForm}
            title="Employees"
          />

          <PrivateRoute
            perms={["manage_timeclock"]}
            path="/timesheet"
            exact
            component={TimeclockPage}
            title="Timesheet"
          />

          <PrivateRoute
            perms={["manage_forecast"]}
            path="/forecasting"
            exact
            component={ForecastPage}
            title="Forecasting"
          />

          <PrivateRoute
            perms={["view_report"]}
            path="/reports"
            exact
            component={ReportsPage}
            title="Reports"
          />

          <PrivateRoute path="/admin-panel" exact component={AdminPanel} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/privacy" component={PrivacyPolicy} />
          <Route path="/terms" component={TermsAndConditions} />
          <PrivateRoute path="/changepassword" component={ChangePassword} />
          <PrivateRoute path="/shifts" component={YourShifts} />
          <PrivateRoute path="/settings" component={Settings} />
          <PrivateRoute path="/profile/:id" component={StaffProfile} />
          <Route path="/join/:id" component={EmployeeJoin} />

          <Route path="/timeclock" component={Timeclock} />
        </Switch>
      </div>
    </Router>
  );
};

export default Main;
