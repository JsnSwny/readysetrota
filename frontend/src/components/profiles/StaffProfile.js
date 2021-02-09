import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShifts, getOpenShifts } from "../../actions/shifts";
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
import { format } from "date-fns";

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

    let openShifts = useSelector((state) => state.shifts.open_shifts);
    let shifts = useSelector((state) => state.shifts.shifts)

  useEffect(() => {
    dispatch(getShifts(format(new Date(), "yyyy-MM-dd"), "", true, user.id == employee_id, employee_id));
    dispatch(getOpenShifts(format(new Date(), "yyyy-MM-dd")));
  }, []);


  useEffect(() => {
    if(typeof(employee) !== 'undefined') {
      setCurrentEmployee(employee);
    }
    if(employee) {
      dispatch(getAvailability(employee.id, employee.business_id));
      dispatch(getHolidays(employee.business_id, employee.id));
    }
  }, [employee])

  // if(siteAdmin && !employees.some(item => item.id == employee_id)) {
  //   return <Redirect to="" />;
  // }

  if (!siteAdmin && id_param) {
    return <Redirect to="" />;
  }

  return (   
    <Fragment>
    <Stats title="Staff Dashboard" type={id_param ? "staff_profile" : "staff"} employee={id_param ? employee_id : false} />
    <div className="dashboard container-2">
      {current.site != 0 && (
        <Fragment>
          
      {current.department != 0 && currentEmployee && (
        <Fragment>
          <UpcomingShifts title="Open Shifts" shifts={openShifts} employee={currentEmployee} admin={siteAdmin && id_param} />
          <UpcomingShifts allow_export={true} title="Upcoming Shifts" shifts={shifts} employee={currentEmployee} admin={siteAdmin && id_param} />
          <div className="flex-container--between-start">
          {plan != "F" && <Availability employee={currentEmployee} />}
          <HolidayRequest holidays={(siteAdmin && id_param) ? holidays.filter(item => item.employee.id == id_param) : holidays} admin={false} />
          
          </div>
        </Fragment>
      )}
        </Fragment>
      )}
      
    </div>
    </Fragment>
  );
};

export default StaffProfile;
