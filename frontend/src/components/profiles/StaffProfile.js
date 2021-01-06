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
import { resetLoading } from "../../actions/loading";
import { useParams, Redirect } from "react-router-dom";
import DepartmentPicker from "./dashboard/DepartmentPicker";
import PositionPicker from "./dashboard/PositionPicker";
import StaffPicker from "./dashboard/StaffPicker";
import SitePicker from "./dashboard/SitePicker"
import Availability from "./Availability";
import UpcomingShifts from "./UpcomingShifts";

const StaffProfile = (props) => {
  const { setOpen, setUpdate, setType } = props;
  const dispatch = useDispatch();

  let user = useSelector((state) => state.auth.user);
  let business = useSelector((state) => state.auth.business);
  let { id: id_param } = useParams();
  let employees = useSelector((state) => state.employees.employees);
  let sites = useSelector((state) => state.employees.sites)
  let plan = useSelector((state) => state.employees.business.plan);
  let current = useSelector(
    (state) => state.employees.current
  );
    
  const isSiteAdmin = (user_id) => {
    return sites.find(site => site.id == current.site) ? (sites.find(site => site.id == current.site).admins.includes(user_id) || user.business) : false;
  }

  const [currentEmployee, setCurrentEmployee] = useState(false);

  let employee_id = parseInt(id_param) || user.id;
  
  let employee = (id_param && employees.find((item) => item.id == employee_id)) ||user.employee.find((employee) =>
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
    if(typeof(employee) !== 'undefined') {
      setCurrentEmployee(employee);
    }
    if(employee) {
      dispatch(getAvailability(employee.id, employee.business_id));
      dispatch(getHolidays(employee.business_id, employee.id));
    }
  }, [employee])


  if (!isSiteAdmin(user.id) && id_param) {
    return <Redirect to="" />;
  }

  return (   
    <div class="dashboard container-2">
      {current.department != 0 && currentEmployee && (
        <Fragment>
          <UpcomingShifts employee={currentEmployee} />
          {plan == "P" && <Availability employee={currentEmployee} />}
        </Fragment>
      )}
    </div>
  );
};

export default StaffProfile;
