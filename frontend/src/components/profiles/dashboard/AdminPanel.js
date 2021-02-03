import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  getEmployees,
  getDepartments,
  getPositions,
  getHolidays,
  getSites,
} from "../../../actions/employees";
import HolidayRequest from "./HolidayRequest";
import Stats from "./stats/Stats";
import SitePicker from "./SitePicker";
import DepartmentPicker from "./DepartmentPicker";
import { toast } from "react-toastify";

const AdminPanel = (props) => {
  const { setOpen, setUpdate, setType } = props;
  const dispatch = useDispatch();

  let current = useSelector(
    (state) => state.employees.current
  );

  let loading = useSelector((state) => state.loading);
  let holidays = useSelector((state) => state.employees.holidays);
  let business = useSelector((state) => state.employees.business);
  let sites = useSelector((state) => state.employees.sites);
  let departments = useSelector((state) => state.employees.departments)

//   useEffect(() => {
//     dispatch(getCustomer(user.profile.stripe_id));
//   }, []);


  return (
      <Fragment>
        <Stats title="Admin Panel" type="business" />
        <div className="dashboard container-2">
          
          {business.plan != "F" && (
            <HolidayRequest holidays={holidays} admin={true} />
          )}
        </div>
      </Fragment>
  );
};

export default AdminPanel;
