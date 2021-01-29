import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShiftsByID } from "../../actions/shifts";
import {
  getEmployees,
  getAvailability,
  getDepartments,
  getPositions,
  getHolidays,
  getSites
} from "../../actions/employees";
import { useParams, Redirect } from "react-router-dom";
import DepartmentPicker from "./dashboard/DepartmentPicker";
import Availability from "./Availability";
import HolidayRequest from "./dashboard/HolidayRequest";
import UpcomingShifts from "./UpcomingShifts";
import Stats from "./dashboard/stats/Stats";
import SitePicker from "./dashboard/SitePicker";

const StaffProfile = (props) => {
  const { setOpen, setUpdate, setType } = props;
  const dispatch = useDispatch();

  let user = useSelector((state) => state.auth.user);
  let { id: id_param } = useParams();
  let employees = useSelector((state) => state.employees.employees);
  let sites = useSelector((state) => state.employees.sites)
  let plan = useSelector((state) => state.employees.business.plan);
  let departments = useSelector((state) => state.employees.departments)
  let current = useSelector(
    (state) => state.employees.current
  );
    
  let siteAdmin = useSelector((state) => state.employees.site_admin);

  const [currentEmployee, setCurrentEmployee] = useState(false);

  let employee_id = parseInt(id_param) || user.id;
  let loading = useSelector((state) => state.loading)
  let holidays = useSelector((state) => state.employees.holidays);
  
  let employee = (id_param && employees.find((item) => item.id == employee_id)) || user.employee.find((employee) =>
    employee.position.some((item) => item.department.id == current.department)
  );

  useEffect(() => {
    dispatch(getShiftsByID(employee_id, user.id == employee_id));
  }, []);

  useEffect(() => {
    if(sites.length == 0) {
      dispatch(getSites());
    }
    if(current.site > 0) {
      dispatch(getDepartments());
    }
  }, [current.site]);

  useEffect(() => {
    if(current.site > 0) {
      if(siteAdmin) {
        dispatch(getHolidays(current.site));
      }
    }
  }, [sites]);

  useEffect(() => {
    if(current.department > 0 && current.site > 0) {
      dispatch(getEmployees());
      dispatch(getPositions(true));
      dispatch(getPositions());
    }
  }, [current.department, current.site]);

  useEffect(() => {
    if(typeof(employee) !== 'undefined') {
      setCurrentEmployee(employee);
    }
    if(employee) {
      dispatch(getAvailability(employee.id, employee.business_id));
      dispatch(getHolidays(employee.business_id, employee.id));
    }
  }, [employee])

  if (!siteAdmin && id_param) {
    return <Redirect to="" />;
  }

  return (   
    <div className="dashboard container-2">
      {current.site != 0 && (
        <Fragment>
          <Stats type={id_param ? "staff_profile" : "staff"} employee={id_param ? employee_id : false} />
      {current.department != 0 && currentEmployee && (
        <Fragment>
          <UpcomingShifts employee={currentEmployee} />
          
          <HolidayRequest holidays={holidays} admin={siteAdmin} />
          {plan == "P" && <Availability employee={currentEmployee} />}
        </Fragment>
      )}
        </Fragment>
      )}
      
    </div>
  );
};

export default StaffProfile;
