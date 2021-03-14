import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getHolidays, getSites } from "../../../actions/employees";
import HolidayRequest from "./HolidayRequest";
import Stats from "./stats/Stats";
import SiteOverview from "./SiteOverview";

const AdminPanel = (props) => {
  const dispatch = useDispatch();

  let current = useSelector((state) => state.employees.current);
  let user = useSelector((state) => state.auth.user);
  let holidays = useSelector((state) => state.employees.holidays);
  let business = useSelector((state) => state.employees.business);
  let sites = useSelector((state) => state.employees.sites);

  useEffect(() => {
    dispatch(getHolidays(current.site.id));
    dispatch(getSites());
  }, []);

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
