import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getEmployees,
  getDepartments,
  getPositions,
  getHolidays,
  getSites,
} from "../../actions/employees";
import {
  resetLoading
} from "../../actions/loading";
import DepartmentPicker from "./dashboard/DepartmentPicker";
import PositionPicker from "./dashboard/PositionPicker";
import StaffPicker from "./dashboard/StaffPicker";
import SitePicker from "./dashboard/SitePicker";
import HolidayRequest from "./dashboard/HolidayRequest";
import { Link } from "react-router-dom";
import { cancelSubscription, getCustomer } from "../../actions/payments";
import { parseISO, format } from "date-fns";

const StaffManagement = (props) => {
  const { setOpen, setUpdate, setType } = props;
  const dispatch = useDispatch();

  let current = useSelector(
    (state) => state.employees.current
  );

  let loading = useSelector((state) => state.loading);
  let holidays = useSelector((state) => state.employees.holidays);
  let business = useSelector((state) => state.employees.business);
  let sites = useSelector((state) => state.employees.sites);
  let subscription = useSelector((state) => state.payments.subscription);
  let employees = useSelector((state) => state.employees.employees);

  useEffect(() => {
    dispatch(getCustomer(user.profile.stripe_id));
  }, []);

  useEffect(() => {
    if(sites.length == 0) {
      dispatch(getSites());
    }
    if(current.site > 0) {
      dispatch(getDepartments());
      dispatch(getHolidays(current.site));
    }
  }, [current.site]);

  useEffect(() => {
    if(current.department > 0) {
      dispatch(getEmployees());
      dispatch(getPositions(true));
      dispatch(getPositions());
    }
  }, [current.department]);

  let user = useSelector((state) => state.auth.user);
  return (
    <Fragment>
      <div className="dashboard container-2">
        <SitePicker setOpen={setOpen} setUpdate={setUpdate} setType={setType} />
        <DepartmentPicker admin={true} />
        {current.department != 0 && (
          <PositionPicker
          setOpen={setOpen}
          setUpdate={setUpdate}
          setType={setType}
          />
        )}
        {current.department != 0 && (
          <StaffPicker
          setOpen={setOpen}
          setUpdate={setUpdate}
          setType={setType}
          />
        )}
          
        {business.plan != "F" && (
          <HolidayRequest holidays={holidays} admin={true} />
        )}
      </div>
    </Fragment>
  );
};

export default StaffManagement;
