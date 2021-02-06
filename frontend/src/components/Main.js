import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getEmployees,
  getDepartments,
  getPositions,
  getHolidays,
  getSites,
} from "../actions/employees";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SideNav from "./layout/SideNav"
import store from "../store";
import Rota from "./shifts/Rota";
import ShiftTemplate from "./shifts/ShiftTemplate";

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

import Confirm from "./layout/Confirm"

const Main = () => {
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(false);
    const [type, setType] = useState("");
    const [shiftInfo, setShiftInfo] = useState({});

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [onConfirm, setOnConfirm] = useState(false);
    const [message, setMessage] = useState(false);

    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1000);

    const dispatch = useDispatch();

    let positions = useSelector((state) => state.employees.positions);
    let departments = useSelector((state) => state.employees.departments);
    let current = useSelector(
        (state) => state.employees.current
    );
    let siteAdmin = useSelector((state) => state.employees.site_admin)
    let business = useSelector((state) => state.employees.business)
    let loading = useSelector((state) => state.loading);

    let sites = useSelector((state) => state.employees.sites);


    useEffect(() => {
        if(sites.length == 0) {
            dispatch(getSites());
        }
        if(current.site > 0) {
            dispatch(getDepartments());
            if(siteAdmin) {
              dispatch(getHolidays(current.site));
            }
            
        }
    }, [current.site]);

    useEffect(() => {
      console.log(siteAdmin)
      if(siteAdmin) {
        dispatch(getHolidays(current.site));
      }
  }, [sites]);

    useEffect(() => {
        if(!loading.departments && !loading.sites) {
            dispatch(getEmployees());
            dispatch(getPositions(true));
            dispatch(getPositions());
        }
    }, [departments, sites]);

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
            <PrivateRoute path="/list/:type" admin={true} exact component={List} modalProps={modalProps} confirmProps={confirmProps} />

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
    )
}

export default Main;