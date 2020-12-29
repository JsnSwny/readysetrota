import React, { Fragment, useEffect } from "react";
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

  let employee_id = parseInt(id_param) || user.id;
  
  let employee = user.employee.find((employee) =>
    employee.position.some((item) => item.department.id == current.department)
  ) || employees.find((item) => item.id == employee_id);

  useEffect(() => {
    dispatch(getShiftsByID(employee_id, user.id == employee_id));
  }, []);

  useEffect(() => {
    if(sites.length == 0) {
      dispatch(getSites());
    }
    dispatch(getDepartments());
    dispatch(getEmployees());
    dispatch(getPositions(true));
    dispatch(getPositions());
  }, [current.site]);

  useEffect(() => {
    if(current.department > 0) {
      dispatch(getEmployees());
      dispatch(getPositions(true));
      dispatch(getPositions());
      dispatch(getHolidays(current.business));
    }
  }, [current.department]);

  useEffect(() => {
    if(employee) {
      dispatch(getAvailability(employee.id, employee.business.id));
      dispatch(getHolidays(employee.business.id, employee.id));
    }
    
  }, [employee])

  if (!business && id_param) {
    return <Redirect to="" />;
  }
  if(typeof(employee) === 'undefined') {
    return <Loading />;
  }

  return ( 
    <Fragment>
      <div className="dashboard__header">
        <div className="container-2">
          <h1 className="title">
            {!id_param
              ? "Your "
              : `${employee.first_name} ${employee.last_name}'s `}
            Profile
          </h1>
        </div>
      </div>

      {!id_param && (
        <Fragment>
          <SitePicker setOpen={setOpen} setUpdate={setUpdate} setType={setType} />
          <DepartmentPicker />
          {current.department != 0 && business && (
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

      {current.department != 0 && (
        <div className="dashboard container-2">
          <UpcomingShifts employee={employee} />
          {plan == "P" && <Availability employee={employee} />}
        </div>
      )}
    </Fragment>
  );
};

export default StaffProfile;
