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
import TrafficItem from "./TrafficItem";
import SiteOverview from "./SiteOverview";

const AdminPanel = (props) => {
  const { setOpen, setUpdate, setType } = props;
  const dispatch = useDispatch();

  let current = useSelector(
    (state) => state.employees.current
  );

  let user = useSelector((state) => state.auth.user);

  let loading = useSelector((state) => state.loading);
  let holidays = useSelector((state) => state.employees.holidays);
  let business = useSelector((state) => state.employees.business);
  let sites = useSelector((state) => state.employees.sites);
  let departments = useSelector((state) => state.employees.departments)

  const [trafficSite, setTrafficSite] = useState(sites[0]);
  


  useEffect(() => {
    dispatch(getHolidays(current.site));
    dispatch(getSites());
  }, []);

  

  const shiftsTitle = (title, value) => (
    <div className="box__title-center">
      <p>{trafficSite.name}</p>
      <h2>{title}</h2>
      <h2>{value}</h2>
    </div>
  )

  return (
      <Fragment>
        <Stats title="Admin Panel" type="business" />
        <div className="dashboard container-2">
          {user.business && <SiteOverview />}
          {business.plan != "F" && (
            <HolidayRequest holidays={holidays} admin={true} />
          )}
        </div>
      </Fragment>
  );
};

export default AdminPanel;
