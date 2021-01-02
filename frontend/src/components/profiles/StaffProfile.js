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
import Loading from "../common/Loading";

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
    if(current.department > 0) {
      dispatch(getEmployees());
      dispatch(getPositions(true));
      dispatch(getPositions());
      // dispatch(getHolidays(current.business));
    }
  }, [current.department]);

  useEffect(() => {
    if (current.business > 0) {
      if(isSiteAdmin(user.id)) {
        dispatch(getHolidays(current.business));
      }
    }
    
  }, [current.business]);

  useEffect(() => {
    if(typeof(employee) !== 'undefined') {
      setCurrentEmployee(employee);
    }
    if(employee) {
      dispatch(getAvailability(employee.id, employee.business_id));
      if(!isSiteAdmin(user.id)) {
        dispatch(getHolidays(employee.business_id, employee.id));
      }
      
    }
  }, [employee])


  if (!isSiteAdmin(user.id) && id_param) {
    return <Redirect to="" />;
  }
  // if(!currentEmployee) {
  //   return <Loading />;
  // }

  return ( 
    <Fragment>
      <div className="dashboard__header">
        <div className="container-2">
          <h1 className="title">
            {!id_param
              ? "Your "
              : `${currentEmployee.first_name} ${currentEmployee.last_name}'s `}
            Profile
          </h1>
        </div>
      </div>

      {!id_param && (
        <Fragment>
          <SitePicker setOpen={setOpen} setUpdate={setUpdate} setType={setType} />
          <DepartmentPicker admin={isSiteAdmin(user.id)} />
          {current.department != 0 && isSiteAdmin(user.id) && (
            <Fragment>
              <PositionPicker
                setOpen={setOpen}
                setUpdate={setUpdate}
                setType={setType}
              />
              <StaffPicker
                setOpen={setOpen}
                setUpdate={setUpdate}
                setType={setType}
              />
            </Fragment>
          )}
        </Fragment>
      )}

      {current.department != 0 && currentEmployee && (
        <div className="dashboard container-2">
          <UpcomingShifts employee={currentEmployee} />
          {plan == "P" && <Availability employee={currentEmployee} />}
        </div>
      )}
    </Fragment>
  );
};

export default StaffProfile;
