import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getEmployees,
  getDepartments,
  getPositions,
  getHolidays,
  getSites,
} from "../../../actions/employees";
import HolidayRequest from "./HolidayRequest";
import Stats from "./stats/Stats";

const AdminPanel = (props) => {
  const { setOpen, setUpdate, setType } = props;
  const dispatch = useDispatch();

  let current = useSelector(
    (state) => state.employees.current
  );

  let holidays = useSelector((state) => state.employees.holidays);
  let business = useSelector((state) => state.employees.business);
  let sites = useSelector((state) => state.employees.sites);

//   useEffect(() => {
//     dispatch(getCustomer(user.profile.stripe_id));
//   }, []);

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
      <div className="dashboard container-2">
        <Stats type="business" />
        {business.plan != "F" && (
          <HolidayRequest holidays={holidays} admin={true} />
        )}
      </div>
  );
};

export default AdminPanel;
